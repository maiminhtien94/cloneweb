// JavaScript Document
function textboxChange(tb, f, sb)
{
    if (!f)
    {
        if (tb.value == "")
        {
            tb.value = sb;
        }
    }
    else
    {
        if (tb.value == sb)
        {
            tb.value = "";
        }
    }
}
function smoothScrolling() { /*-------------------------------------------------*/
/* =  smooth scroll in chrome
	/*-------------------------------------------------*/
  try {
    $.browserSelector();
    // Adds window smooth scroll on chrome.
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {

  }

}
function doEnter(evt) {
    // IE					// Netscape/Firefox/Opera
    var key;
    if (evt.keyCode == 13 || evt.which == 13) {
        onSearch(evt);
    }
}
function onSearch(evt) {

    var keyword = document.getElementById("keyword").value;
    var giatu = document.getElementById("giatu").value;
    var giaden = document.getElementById("giaden").value;
    if (keyword == '' || keyword == 'Tìm kiếm sản phẩm...')
        alert('Bạn chưa nhập từ khóa tìm kiếm!');
    else {
        //var encoded = Base64.encode(keyword);
        location.href = "tim-kiem.html/keyword=" + keyword + "&giatu=" + giatu + "&giaden=" + giaden;
        loadPage(document.location);
    }
}
$(document).ready(function () {
	smoothScrolling();
    $("#cssmenu").menumaker({
        title: "Menu",
        format: "multitoggle"
    });
    $(".small-screen").find("ul li").each(function () {
        if ($(this).hasClass("line")) {
            $(this).remove();
        }
        if ($(this).find('a transitionAll').hasClass("icon_menu")) {
            $(this).remove();
        }
    });
})
$(document).ready(function (e) {
    $('.click').click(function () {
        if ($('.left').hasClass("abc")) {
            $('.left').removeClass("abc");
            $('.left').delay('300').animate({left: 20, height: '400px'});
        }
        else {
            $('.left').addClass("abc");
            $('.left').delay('300').animate({left: -300});
        }

    })
    // thanh scroll left

});
$(document).ready(function (e) {
    $('.item .img-thumb').click(function () {
        var id = $(this).attr('data-id');

        $('.item .img-thumb').removeClass('active');
        $(this).addClass('active');
        $('.big-img a .img').each(function (index, element) {
            var id1 = $(this).attr('data-id');
            if (id1 == id) {
                $('.big-img a .img').removeClass('active');
                $(this).css("opacity", 0);
                $(this).addClass('active');
                $(this).animate({"opacity": 1}, 1000);
            }
        });
    })

});
function addtocart(id,$sl){
	$.ajax({
		type:'post',
		url:"gio-hang.html",
		data:{id:id,sl:$sl,act:'add'},
		//dataType:'json',
		success:function(data){
			$(".source-cart a").html(data.num);
			updateCartNum()
			//swal("Thông báo", "Thêm sản phẩm vào giỏ hàng thành công!", "success");
			$.fancybox({
				href:base_url+"/gio-hang/fill.html",
				type:"ajax"
			})
		}
		
		
	
	})
	return false;
}

function updateCartNum(){
	$.get("index.php",{ajax:"number"},function(data){
		
		$("#cart-total").html(data);
	})
	
	
}
//check comment
function form_step1($obj,$id){
	$($obj).parents(".danhgia").animate({height:"0"},function(){
		$("#"+$id).animate({height:$("#"+$id).data("height")});
		$("#result_comment").hide();
		
	})
	
}
function form_step2($obj,$id){
	$("#comment").animate({height:"0"},function(){
		$("."+$id).animate({height:$("."+$id).data("height")});
		
	})
	
}
function form_step3($obj,$id){
	$("#comment").animate({height:"0"},function(){
		$("."+$id).animate({height:$("."+$id).data("height")});
		
	})
	
}
function comment_check()
{
    var frm = document.frm_config;
    if (frm.hoten.value == '')
    {
        alert("Bạn chưa nhập họ tên.");
        frm.hoten.focus();
        return false;
    }
    if (frm.dienthoai.value == '')
    {
        alert("Bạn chưa nhập số điện thoại");
        frm.sodt.focus();
        $('#RegLoading').hide();
        return false;
    }
    
    if (!IsNumeric(frm.dienthoai.value))
    {
        alert("Bạn chưa nhập số điện thoại.");
        frm.dienthoai.focus();
        $('#RegLoading').hide();
        return false;
    }
    if (!validEmail(frm.email)) {
        alert('Vui lòng nhập đúng địa chỉ email');
        frm.email.focus();
        $('#RegLoading').hide();
        return false;
    }
	var currentLocation = window.location;
    $.post("ajax/xuly.php", {
        hoten: $('#hoten').val(),
        noidung: $('#noidung').val(),
        tieude: $('#tieude').val(),
        email: frm.email.value,
		rating: $('#rating-input').val(),
		id_sp: $('#id_sp').val(),
        dienthoai: $('#dienthoai').val(),
        act: 'comment',
    }, function (response) {
		$k=$.parseJSON(response);
		if($k.id==1){
			$("#result_comment").html($k.thongbao);
			$("#result_comment").fadeIn(500);
			form_step3("boqua","danhgia");
		}else{
			$(".result_comment1").html($k.thongbao);
			$(".result_comment1").fadeIn(500);
		}
		
    });
}
$().ready(function(){
	checkLimit();
		$("#page-nav").click(function(){
		$.ajax({
			data:$("#formx").serialize(),
			type:"post",
			dataType:'json',
			success:function(data){
				$("#current").val(data.current);
				$(".box_result_comment").append(data.source);
				checkLimit();
			}
		})
			return false;
	})
})
function checkLimit(){
$tt = parseInt($("#total").val());
$cr = parseInt($("#current").val());

if($cr < $tt){
	
	$("#page-nav").removeClass("hide").find("a").html("Xem thêm "+($tt-$cr)+" bình luận <span class='caret'></span>");
}else{
	$("#page-nav").addClass("hide");
}


}
