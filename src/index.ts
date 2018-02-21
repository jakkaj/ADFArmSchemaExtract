import * as path from "path";
import * as fs from "fs";

import * as data from 'C:\\Temp\\demotemp\\demo6\\arm_template.json'

class loader {
    public parseArm() {
        var resources = data["resources"]
        var allOutput: string = "";
        for (var d in resources) {
            var entry = resources[d];
            var anyEntry = (<any>entry);
            //console.log(entry);
            var name = (<any>entry).name;

            var nameOutput = name.match(/\/(.*?)_txt/);

            if (!nameOutput) {
                continue;
            }

            console.log(nameOutput[1]);
            var structure = anyEntry["properties"]["structure"];

            var sqlOutput: string = "SET ANSI_NULLS ON\r\n" +
                "GO\r\n" +
                "SET QUOTED_IDENTIFIER ON\r\n" +
                "GO\r\n" +
                `CREATE TABLE [lnd].[${nameOutput[1]}](\r\n`

            var sqlLines: string[] = [];

            for (var colNumb in structure) {
                var col = structure[colNumb];
                var colName = col["name"];
                var thisLine = `\t[${colName}] [nvarchar](512) NULL`;
                sqlLines.push(thisLine);
            }

            var lines = sqlLines.join(',\r\n');

            sqlOutput += lines + "\r\n) ON [PRIMARY]\r\n" +
                "GO\r\n";

            var filePath = path.join(__dirname, "sqloutputs", `${nameOutput[1]}.txt`);

            fs.writeFileSync(filePath, sqlOutput);
            console.log(sqlOutput);

            allOutput += "\r\n" + sqlOutput;
        }

        var allFilePah = path.join(__dirname, "sqloutputs", `all.txt`);

        fs.writeFileSync(allFilePah, allOutput);
    }
}

var l = new loader();
l.parseArm();



