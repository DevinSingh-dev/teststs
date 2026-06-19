import { v9 } from "../../Vein.js/init.js";

function history_fired_function([oldval, newval, ...path]){
    if (oldval === undefined)return;

    let joined_path = path.join("*");
    let existing = this.get(`history_storage/${joined_path}`) ?? [];
    existing.push(oldval);
    this.wset(`history_storage/${joined_path}`, existing);
}

class history_class {
    static history_fired_function = history_fired_function
    static scripts = [
        [
            {
                signal: v9.utilities.ssc("/")
                ,fired: history_fired_function
            }
        ]
        ,[
            {
                signal: v9.utilities.ssc("/", "del")
                ,fired: history_fired_function
            }
        ]
    ]
    static undo(module, ...path){
        let key = v9.utilities.normalize_path(path).join("*");
        let existing = module.get(`history_storage/${key}`);
        if (!existing?.length)return;
        let prev = existing.pop();
        module.wset(`history_storage/${key}`, existing);
        module.set(...path, prev);
    }
    static extends(base = v9.module){
        return class extends base {
            undo(...path){
                history_class.undo(this, ...path);
            }
            constructor(files, ...scripts){
                super(files, ...history_class.scripts, ...scripts);
            }
        }
    }
}

history_class.module = history_class.extends();
v9.establish(history_class, "history");