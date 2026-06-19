import { v9 } from "../../Vein.js/init.js";

class tags_class{
    static search(module, tag="") {
        let reg = module.get(`tag_registry/${tag}`);
        if (!reg) return [];
        return Object.values(reg);
    }
    static scripts = [
        [
            new v9.script({
                signal: v9.utilities.ssc("scripts_storage/")
                ,fired([,script]){
                    if (script.proto.tags==undefined)return;
                    script.proto.tags.forEach((tag)=>{
                        this.set(`tag_registry/${tag}/${script.id}`, script);
                    })
                }
            })
        ]
        ,[
            new v9.script({
            signal: v9.utilities.ssc("scripts_storage/","del")
                ,fired([script]){
                    if (script.proto.tags==undefined)return;
                    script.proto.tags.forEach((tag)=>{
                        this.del(`tag_registry/${tag}/${script.id}`);
                        if (Object.keys(this.get(`tag_registry/${tag}`)).length == 0){
                            this.del(`tag_registry/${tag}`);
                        }
                    })
                }
            })
        ]
    ]
    static extends(base = v9.module){
        return class extends base {
            search(tag){
                return tags_class.search(this, tag);
            }
            constructor(files, ...scripts){
                super(files, ...tags_class.scripts, ...scripts);
            }
        }
    }
}

tags_class.module = tags_class.extends();
v9.establish(tags_class, "tags");