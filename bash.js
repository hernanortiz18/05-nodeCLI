const commands = require("./commands");

function terminate(output) {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  let cmd = data.toString().trim();
  cmd = cmd.split(" ");
  const nameCommand = cmd.shift();
  const arguments = cmd.join(" ");

  commands[nameCommand](arguments, terminate);
});
