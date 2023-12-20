var btnGenerater = document.getElementById('btnGenerater');
var divContent = document.getElementById("result");
var cbGetSet = document.getElementById("check1");
var cbComment = document.getElementById("check2");
btnGenerater.onclick = function  () {//给对象绑定事件
    // console.log("111" + cbGetSet.checked + " " + cbComment.checked);
    chrome.tabs.getSelected(null, function  (tab) {//获取当前tab
        //向tab发送请求
        
        chrome.tabs.sendRequest(tab.id, { action: "generater", getSet: cbGetSet.checked, comment: cbComment.checked }, function  (response) {
            if (response == null) {
                return;
            }
            var req = response["req"];
            var content = "";
            content += handle(req);
            content += "<br/>";
            var resp = response["resp"];
            content += handle(resp);
            
            divContent.innerHTML = content;
        });

        function handle(data) {
            var content = "";
            for (var i = 0; i < data.length; i++) {   
                var name = data[i]["name"];
                var type = data[i]["type"];
                var comment = data[i]["comment"];
                if (type.toLowerCase() === "string") {
                    type = "String"; 
                } else if (type.toLowerCase() === "number") {
                    type = "double";
                } else if (type.toLowerCase() === "integer") {
                    type = "int";
                } 
                if (cbComment.checked) {
                    content += "//" + comment + "<br/>";
                }
                if (cbGetSet.checked) {
                    content += `private ${type} ${name};<br/>`
                    var upName = name.charAt(0).toUpperCase() + name.slice(1);
                    //setXX
                    content += `public void set${upName}() {<br/>`;
                    content += `&nbsp;&nbsp;&nbsp;&nbsp;this.${name} = ${name};<br/>`;
                    content += `}<br/>`;
                    //getXX
                    content += `public void get${upName}() {<br/>`;
                    content += `&nbsp;&nbsp;&nbsp;&nbsp;return this.${name};<br/>`;
                    content += `}<br/>`;
                } else {
                    content += `public ${type} ${name};<br/>`;
                }             
            }
            return content;
        }
    });
}