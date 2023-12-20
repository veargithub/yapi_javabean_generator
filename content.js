chrome.extension.onRequest.addListener(//监听扩展程序进程或内容脚本发送的请求
    function  (request, sender, sendResponse) {
        if  (request.action == "generater") {
            console.log(request.getSet);
            // const title = document.title;
            const tables = document.getElementsByClassName("ant-table-tbody");
            if (tables.length < 2) {
                sendResponse(null);
                return;
            }
            var result = {};
            const reqRows = tables[1].getElementsByTagName("tr");
            result["req"] = [];
            for (var i = 0; i < reqRows.length; i++) {
				const values = reqRows[i].getElementsByTagName("td");
				console.log("name:" + values[0].textContent);
				console.log("type:" + values[1].textContent);
                console.log("comment:" + values[4].textContent);
                result["req"].push({
                    "name": values[0].textContent,
                    "type": values[1].textContent,
                    "comment": values[4].textContent
                });
			}
            const respRows = tables[2].getElementsByTagName("tr");
            result["resp"] = [];
            for (var i = 0; i < respRows.length; i++) {
				const values = respRows[i].getElementsByTagName("td");
				console.log("name:" + values[0].textContent);
				console.log("type:" + values[1].textContent);
                console.log("comment:" + values[4].textContent);
                result["resp"].push({
                    "name": values[0].textContent,
                    "type": values[1].textContent,
                    "comment": values[4].textContent
                });
			}
            sendResponse(result);
        }
    },

    
);

function gen() {
    /// todo
}