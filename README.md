# Quickly Create SQL Schemas from Azure Data Factory 

When using [Azure Data Factory](https://azure.microsoft.com/en-us/services/data-factory/) it can be time consuming to create schemas for your data warehouse landing tables automatically from your source data - especially if you have a lot of tables and columns to think about. 

This node script reads the ARM template from your ADF data pipeline and creates a set of create table SQL statements. All columns are created with nvarchar(512) (which you can change!) with the idea that the casting will occur in your stored proc processing from landing to your final dw schema. 

## Instructions

- Install the npm app

```
npm install -g adfarmtosql
```

- Download the ARM template from your ADF instance 

![arm](https://user-images.githubusercontent.com/5225782/36461393-4045ebc2-1711-11e8-9473-958ebbac5d87.PNG)

- Run the app passing in the path to the ARM template

*Note: Run the app from the folder that you want to save the output in*

```bash
adfarmtosql -p "C:\Users\jak\demo\demo42\arm_template.json"
```

### Editing and running locally

By default, the app is very generic. If you need to make some changes to the output you can run locally to make any changes you need. 

- Get the code 

```
git pull https://github.com/jakkaj/ADFArmSchemaExtract
```

- Restore npm packages

```
npm install
```

- Type `npm run watch`. This command is long running and will not exit. It watches the typescript code for changes and will automatically rebuild when changes are detected. 


- Type `npm run outputwatch`. This is also long running and will watch the built outputs from the typescript watcher and automatically re-run the app... so you can edit/view the result nice and fast without having to manually restart the app each time. 

-  Save `index.ts` to kick-off the rebuild and run. 

Make any edits you need to the tile to get your outputs as you need! 

Outputs will be saved to `./sqloutputs`. Each table will be in its own file. `all.txt` contains all the SQL statements in one file to run easily on your server. 


```SQL
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [lnd].[companyaccounts_gateways](
	[_id] [nvarchar](512) NULL,
	[companyaccounts_gateways_dim1_idx] [nvarchar](512) NULL,
	[created_at] [nvarchar](512) NULL,
	[updated_at] [nvarchar](512) NULL,
	[name] [nvarchar](512) NULL,
	[username] [nvarchar](512) NULL,
	[password] [nvarchar](512) NULL,
	[type] [nvarchar](512) NULL,
	[gateways._id] [nvarchar](512) NULL,
	[default] [nvarchar](512) NULL,
	[mode] [nvarchar](512) NULL,
	[merchant] [nvarchar](512) NULL,
	[meta_real_time_card] [nvarchar](512) NULL
) ON [PRIMARY]
GO
```



