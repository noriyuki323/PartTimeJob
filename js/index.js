var dappAddress = "n1pwCNUeCCqQasUwkCPXmsubKHMiytpwJvF";
$(function() {	
	
	    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
        var nebpay = new NebPay();

		
        //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
        var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";
		
		
    $("#navall").click(function() {
		$("#navall").addClass("active");
		$("#navmy").removeClass("active");
		$("#navcreate").removeClass("active");
        $("#detailTitle").text("所有兼职");

        var to = dappAddress;
        var value = "0";
        var callFunction = "getAll";
        var callArgs = "[]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp) {
                //console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
                var myArr = JSON.parse(resp.result);
				if(myArr.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}

                var tempStr = "";
				tempStr += '<table class="table table-condensed table-bordered"><thead><tr><th>编号</th><th>兼职标题</th><th>详细</th><th>创建日期</th></tr></thead><tbody id="searchresult">';

                for (var i = 0; i < myArr.length; i++) {
                    if (i % 2 == 0) {
                        tempStr += '<tr class="warning">';
                    } else {
                        tempStr += '<tr class="info">';
                    }
					
                    tempStr += '<td>';
                    tempStr += myArr[i].key;
                    tempStr += '</td>';
                    tempStr += '<td>';
                    tempStr += myArr[i].title;
                    tempStr += '</td>';
                    tempStr += '<td>';
                    tempStr += myArr[i].detail;
                    tempStr += '</td>';
					tempStr += '<td>';
                    tempStr += new Date(myArr[i].createdDate * 1000).toLocaleString();
                    tempStr += '</td>';
                    tempStr += '</tr>';
                }
                console.log(tempStr);
                $("#searchresult").html(tempStr);
            }
        });

    });
	$("#navall").click();

    $("#navmy").click(function() {
		$("#navall").removeClass("active");
		$("#navmy").addClass("active");
		$("#navcreate").removeClass("active");
        $("#detailTitle").text("我发布的兼职");



        var to = dappAddress;
        var value = "0";
        var callFunction = "getMy";
        var callArgs = "[]";
        nebpay.simulateCall(to, value, callFunction, callArgs, {
            listener: function(resp) {
                //console.log(JSON.stringify(resp.result));
				if(resp.result == ""){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
                var myArr = JSON.parse(resp.result);
				if(myArr.length == 0){
					$("#searchresult").html('<div class="panel-body">暂时没有记录</div>');
					return;
				}
				

               var tempStr = "";
				tempStr += '<table class="table table-condensed table-bordered"><thead><tr><th>编号</th><th>兼职标题</th><th>详细</th><th>创建日期</th><th>操作</th></tr></thead><tbody id="searchresult">';

                for (var i = 0; i < myArr.length; i++) {
                    if (i % 2 == 0) {
                        tempStr += '<tr class="warning">';
                    } else {
                        tempStr += '<tr class="info">';
                    }
					
                    tempStr += '<td>';
                    tempStr += myArr[i].key;
                    tempStr += '</td>';
                    tempStr += '<td>';
                    tempStr += myArr[i].title;
                    tempStr += '</td>';
                    tempStr += '<td>';
                    tempStr += myArr[i].detail;
                    tempStr += '</td>';
					tempStr += '<td>';
                    tempStr += new Date(myArr[i].createdDate * 1000).toLocaleString();
                    tempStr += '</td>';
					tempStr += '<td>';
                    tempStr += '<button type="button" class="btn btn-primary" id="deltebutton" onclick="deletejob('+ myArr[i].key + ');">删除</button>';	
                    tempStr += '</td>';
                    tempStr += '</tr>';
                }
                console.log(tempStr);
                $("#searchresult").html(tempStr);
            }
        });

    });

    $("#navcreate").click(function() {
		$("#navall").removeClass("active");
		$("#navmy").removeClass("active");
		$("#navcreate").addClass("active");
        $("#detailTitle").text("发布兼职");

        var tempStr = '';
		tempStr += '<div class="panel-body"> ';
		tempStr += '<form role="form">';
		tempStr += '<div class="form-group">';
        tempStr += '<label for="title">兼职标题</label>';
        tempStr += '<input type="text" class="form-control" id="title" />';
		tempStr += '</div>';
        tempStr += '<div class="form-group">';
        tempStr += '<label for="content">详细内容</label>'; 
        tempStr += '<textarea class="form-control" rows="10" id="content"></textarea>';
		tempStr += '<button type="button" class="btn btn-primary" id="savebutton" onclick="save();">发布</button>';		
        tempStr += '</div>';
        tempStr += '</form>';
		tempStr += '</div> ';
		console.log(tempStr);

		$("#searchresult").html(tempStr);
    });

});

function deletejob(index){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
    var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";

        var to = dappAddress;
        var value = "0";
        var callFunction = "deleteJob";
        var callArgs = "[\"" + index + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp.result));
            }
        });
};

function save(){
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    //var dappAddress = "n1nk8EEJcCE2J1fk2wdFCLMkhH8cttrxGJE";
    var txHash = "8f1ad354e2a5dd992ffaa3aa1b35fad074379760ca2e00d906e8b732809c03a3";
	
	    var title = $("#title").val();

        if (title == "") {
            alert("请输入兼职的标题。");
            return;
        }
		
	    var content = $("#content").val();

        if (content == "") {
            alert("请输入兼职的详细内容。");
            return;
        }
		
		content= content.replace(/\n/g,"<br>"); 

        var to = dappAddress;
        var value = "0";
        var callFunction = "save";
        var callArgs = '["' + title + '","' + content + '"]';
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
				alert("发布成功");
            }
        });
	
};