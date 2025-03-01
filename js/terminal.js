document.addEventListener("DOMContentLoaded", () => {
  const terminal = new Terminal();
  const commands = new Commands();
  commands.add("help", () => "DEML.DEV - HELP");

  const eventManager = new TerminalEventManager();
  eventManager.subscribe("command", command => {
    terminal.append(command + "\n" + commands.get(command));
    terminal.reset();
  });

  eventManager.subscribe("help", () => {
    console.log("printing help");
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Enter") {
      return;
    }
    eventManager.publish("command", terminal.input.value);
  });


});

class Commands {
  constructor() {
    this.commands = {};
  }
  add(command, callback) {
    this.commands[command] = callback;
  }
  get(command) {
    if(!this.commands[command]) {
      return `Command not found: ${command}`;
    }
    return this.commands[command]();
  }
}

class TerminalEventManager {
  constructor() {
    this.eventlisteners = {};
  }

  subscribe(event, callback) {
    if (!this.eventlisteners[event]) {
      this.eventlisteners[event] = [];
    }
    this.eventlisteners[event].push(callback);
  }

  publish(event, data) {
    if (!this.eventlisteners[event]) {
      return;
    }
    this.eventlisteners[event].forEach(callback => callback(data));
  }

}

class Terminal {
  constructor() {
    this.domNode = document.querySelector("#terminal");
    this.input = document.querySelector("#input");
    this.fakeInput = document.querySelector("#fakeInput");
    this.input.addEventListener("input", () => {
      console.log(this.input.value);
      this.fakeInput.innerText = this.input.value;
    });
  }

  append(text) {
    const li = document.createElement("li");
    li.innerText = "deml.dev ~> " + text;
    this.domNode.insertBefore(li, this.domNode.lastChild);
  }

  reset = () => {
    this.input.value = "";
    this.fakeInput.innerText = "";
  }
}