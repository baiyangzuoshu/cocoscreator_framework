import { _decorator, Component, Node } from 'cc';
import CSV from '../3rd/CSVParser';

export class ExcelManager extends Component {
    public static Instance: ExcelManager = null!;
    
    csvTables:any = {};  // "表格名字"---> object {key1(第一个字段): row1, ke2: row2}
    csvTableForArr:any = {}; // 表格名字---》array [row1, row2, row3,..]
    tableCast:any = {}; // 存放的是我们这个表格的类型
    tableComment:any = {}; // 存放的是我们表格的注释;
    
    public onLoad(): void {
        if(ExcelManager.Instance === null) {
            ExcelManager.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }

    public Init(): void {

    }

    public AddTable (tableName:string, tableContent:string, force?:boolean) {
        if (this.csvTables[tableName] && !force) {
            return;
        }

        var tableData = {}; // 作为主键---》object 映射表
        var tableArr = []; // 所有数据放一个数组; 
        var opts = { header: true };
        CSV.parse(tableContent, opts, function (row, keyname) {
            tableData[row[keyname]] = row;
            tableArr.push(row);
        });

        // this.tableCast[tableName] = (CSV as any).opts.cast;
        // this.tableComment[tableName] = (CSV as any).opts.comment;

        this.csvTables[tableName] = tableData;
        this.csvTableForArr[tableName] = tableArr;

        //this.csvTables[tableName].initFromText(tableContent);
    }

    public GetTableArr (tableName:string) {
        return this.csvTableForArr[tableName];
    }

    public GetTable (tableName:string) {
        return this.csvTables[tableName];
    }

    QueryOne (tableName:string, key:string, value:any) {
        var table = this.GetTable(tableName);
        if (!table) {
            return null;
        }
        
        if (key) {
            for (var tbItem in table) {
                if (!table.hasOwnProperty(tbItem)) {
                    continue;
                }

                if (table[tbItem][key] === value) {
                    return table[tbItem];
                }
            }
            
        } else {
            return table[value];
        }
    }

    QueryByID (tableName:string, ID:string) {
        return this.QueryOne(tableName, null, ID);
    }

    QueryAll (tableName:string, key:string, value:any) {
        var table = this.GetTable(tableName);
        if (!table || !key) {
            return null;
        }

        var ret = {};
        for (var tbItem in table) {
            if (!table.hasOwnProperty(tbItem)) {
                continue;
            }

            if (table[tbItem][key] === value) {
                ret[tbItem] = table[tbItem];
            }
        }

        return ret;
    }

    public QueryIn (tableName:string, key:string, values:Array<any>) {
        var table = this.GetTable(tableName);
        if (!table || !key) {
            return null;
        }

        var ret = {};
        var keys = Object.keys(table);
        var length = keys.length;
        for (var i = 0; i < length; i++) {
            var item = table[keys[i]];
            if (values.indexOf(item[key]) > -1) {
                ret[keys[i]] = item;
            }
        }

        return ret;
    }

    QueryByCondition (tableName:string, condition: any) {
        if (condition.constructor !== Object) {
            return null;
        }

        var table = this.GetTable(tableName);
        if (!table) {
            return null;
        }

        var ret = {};
        var tableKeys = Object.keys(table);
        var tableKeysLength = tableKeys.length;
        var keys = Object.keys(condition);
        var keysLength = keys.length;
        for (var i = 0; i < tableKeysLength; i++) {
            var item = table[tableKeys[i]];
            var fit = true;
            for (var j = 0; j < keysLength; j++) {
                var key = keys[j];
                fit = fit && (condition[key] === item[key]) && !ret[tableKeys[i]];
            }

            if (fit) {
                ret[tableKeys[i]] = item;
            }
        }

        return ret;
    }

    QueryOneByCondition (tableName:string, condition: any) {
        if (condition.constructor !== Object) {
            return null;
        }

        var table = this.GetTable(tableName);
        if (!table) {
            return null;
        }
        
        var keys = Object.keys(condition);
        var keysLength = keys.length;

        for (let keyName in table) {
            var item = table[keyName];

            var fit = true;
            for (var j = 0; j < keysLength; j++) {
                var key = keys[j];
                fit = fit && (condition[key] === item[key]);
            }

            if (fit) {
                return item;
            }
        }

        return null;
    }
}


