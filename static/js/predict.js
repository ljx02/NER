function predict(){
    sentence = document.getElementById('input').value;

    $.ajax({
                url: '/predict',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(sentence),
                success: (data) => {
                    eval('var item=' + data)
                    var str_per = 'PER: '
                    var str_loc = 'LOC: '
                    var str_org = 'ORG: '
                    for(var i=0; i<item.PER.length; i++){
                        str_per = str_per + item.PER[i] + ' '
                    }
                    for(var i=0; i<item.LOC.length; i++){
                        str_loc = str_loc + item.LOC[i] + ' '
                    }
                    for(var i=0; i<item.ORG.length; i++){
                        str_org = str_org + item.ORG[i] + ' '
                    }

                    $('#output').text(str_per + '\n' + str_loc + '\n' + str_org);
                    }
    });
}

function clean(){
    window.location.reload(true)
}

$(document).ready(function(){
    var limitNum = 200;
    var pattern = '已输入 0/200 字符';
    $('#contentwordage').html(pattern);
    $('#input').keyup(
        function(event){
            if(event.keyCode=='32' || event.keyCode=='13'){
            var remain = $(this).val().length;
            if(remain > 200){
                pattern = '字数超过限制！';
            }else{
                var result = remain;
                predict()
                pattern = '已输入' + result + '/200 字符';
            }
            $('#contentwordage').html(pattern);
        }}
    );
});

var add_div = document.getElementById('adddiv');

var data = [
    {item:'北京', tag:'LOC'},
    {item:'中国北京', tag:'LOC'},
    {item:'北京天安门', tag:'LOC'},
    {item:'北京市政府信息部门', tag:'LOC'}
]

function setDiv(item){
    var div = '<div style="background-color:ghostwhite;border-color:ghostwhite;display:inline-block;padding:10px 10px 10px 10px;max-weight:30px;margin:3px 3px 3px 3px;cursor:pointer">'+
            '<div style="height:auto;text-align:center;max-width:280px;font-size:14px;padding:3px 3px 3px 3px;">'
            + item.item
            + '</div></div>'
    return div
}

function get_item(){
    var html = ''
    for (var i=0; i<data.length; i++){
        html += setDiv(data[i])
    }
    console.log(html)
    add_div.innerHTML = html
}

window.onload = get_item()

var change_bool = 0;
function changeColor(obj){
    //修改class这个属性就变相修改了css样式
    if (change_bool == 0){
        $(obj).attr("class", "result_show");
        change_bool = 1;
    }
    else{
        $(obj).attr("class", "result_box");
        change_bool = 0;
    }
}