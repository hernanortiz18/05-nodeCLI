const fs = require("fs");

module.exports = {
  pwd: function (args, funcionTerminate) {
    funcionTerminate(process.cwd());
  },

  date: function (args, funcionTerminate) {
    funcionTerminate(Date());
  },

  ls: function (args, funcionTerminate) {
    fs.readdir(".", function (err, files) {
      let str = "";
      if (err) throw err;
      files.forEach(function (file) {
        str += process.stdout.write(file.toString() + "\n");
      });
      funcionTerminate(str);
    });
  },

  echo: function (args, funcionTerminate) {
    args = args.split(" ");
    if (args[0] === "echo") {
      args.shift();
      args = args.join(" ");
    } else {
      args = args.join(" ");
    }
    funcionTerminate(args);
  },

  cat: function (fileName, funcionTerminate) {
    fs.readFile(`./${fileName}`, "utf8", function (err, data) {
      if (err) {
        return err;
      }
      funcionTerminate(data);
    });
  },

  head: function (arguments, funcionTerminate) {
    const argumentsArray = arguments.split(" ");
    const fileName = argumentsArray[0];
    let n = argumentsArray[1];
    if (argumentsArray[1] === undefined) {
      n = 5;
    }

    fs.readFile(`./${fileName}`, "utf8", function (err, data) {
      if (err) {
        return err;
      }
      const lineas = data.split("\n").slice(0, n);
      funcionTerminate(lineas.join("\n"));
    });
  },

  tail: function (arguments, funcionTerminate) {
    const argumentsArray = arguments.split(" ");
    const fileName = argumentsArray[0];
    let ultimasLineas = argumentsArray[1];
    if (argumentsArray[1] === undefined) {
      ultimasLineas = 5;
    }

    fs.readFile(`./${fileName}`, "utf8", function (err, data) {
      if (err) {
        return err;
      }
      let lineas = data.split("\n");
      let n = lineas.length - 1 - ultimasLineas;
      lineas = lineas.slice(n);
      funcionTerminate(lineas.join("\n"));
    });
  },

  sort: function (fileName, funcionTerminate) {
    fs.readFile(`./${fileName}`, "utf8", function (err, data) {
      if (err) {
        return err;
      }
      data = data.split("\n");
      data.sort((a, b) => a - b);
      data.join("\n");
      funcionTerminate(data);
    });
  },
};
