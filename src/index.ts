import * as path from "path";
import * as fs from "fs";
import * as program from "commander";


class loader {
    armPath : string = "";
    /**
     *
     */
    constructor(path:string) {
       this.armPath = path;        

    }
    public parseArm() {
        var fileExists = fs.existsSync(this.armPath);
        
        if(!fileExists){
            console.log(`Could not find the ARM file: ${this.armPath}`);
            process.exit();
        }

        var armData = fs.readFileSync(this.armPath).toString();
        console.log(armData);

        var data:any = JSON.parse(armData);
        var outputDir = path.join(__dirname, "sqloutputs");
        
        if (!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir);
        }

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

            var filePath = path.join(outputDir, `${nameOutput[1]}.txt`);

            fs.writeFileSync(filePath, sqlOutput);
            console.log(sqlOutput);

            allOutput += "\r\n" + sqlOutput;
        }

        var allFilePah = path.join(outputDir, `all.txt`);

        fs.writeFileSync(allFilePah, allOutput);
    }
}

program
.option('-p, --path [armTemplatePath]', 'path to the ADF ARM template')
.parse(process.argv);

if(!program.path){
    console.log("You must enter a path. use the --help option for hints.")
    process.exit();
}

var l = new loader(program.path);
l.parseArm();



