# Quickly Create SQL Schemas from Azure Data Factory 

When using [Azure Data Factory](https://azure.microsoft.com/en-us/services/data-factory/) it can be time consuming to create schemas for your data warehouse landing tables automatically from your source data - especially if you have a lot of tables and columns to think about. 

This node script reads the ARM template from your ADF data pipeline and creates a set of create table SQL statements. All columns are created with nvarchar(512) (which you can change!) with the idea that the casting will occur in your stored proc processing from landing to your final dw schema. 

