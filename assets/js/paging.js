function loadData(page, clas,pag){
        loading_show(); 
        $.ajax
        ({
            type: "POST",
            url: "ajax/load_data.php",
            data: {page:page,pag:pag},
            success: function(msg)
            {
				loading_hide();
				$("."+clas).html(msg);
				$('.box_product1 .phantrang .paginate_button').unbind("click");	
				$('.box_product1 .phantrang .paginate_button').click(function(){
					if($(this).hasClass("paginate_button_disabled")){
						return false;
					}else{
						var page = $(this).attr('p');
						loadData(page,'box_product1','canh-cao');
					}
					
				});
				$('.box_product2 .phantrang .paginate_button').unbind("click");	
				$('.box_product2 .phantrang .paginate_button').click(function(){
					if($(this).hasClass("paginate_button_disabled")){
						return false;
					}else{
						var page = $(this).attr('p');
						loadData(page,'box_product2','quy-dinh');
					}
				});
            }
        });
    }
	function loading_show(){
        $('#loading').show();
    }

    // PHƯƠNG THỨC ẨN HÌNH LOADING
    function loading_hide(){
        $('#loading').fadeOut('fast');
    }             

 $(document).ready(function(){
	
    // PHƯƠNG THỨC SHOW HÌNH LOADING
    
    // PHƯƠNG THỨC LOAD KẾT QUẢ 
    

    // LOAD GIÁ TRỊ MẶC ĐỊNH PAGE = 1 CHO LẦN ĐẦU TIÊN
    loadData(1,'box_product1','canh-cao');
	loadData(1,'box_product2','quy-dinh');

    // LOAD KẾT QUẢ CHO TRANG
    $('.box_product1 .phantrang .paginate_button').click(function(){
        var page = $(this).attr('p');
       loadData(page,'box_product1','canh-cao');
    });
	
	
	$('.box_product3 .phantrang .paginate_button').click(function(){
        var page = $(this).attr('p');
        loadData(page,'box_product3','quy-dinh');
    });

    // PHƯƠNG THỨC DÙNG ĐỂ HIỆN KẾT QUẢ KHI NHẬP GIÁ TRỊ PAGE VÀO TEXTBOX
    // BẠN CÓ THỂ MỞ TEXTBOX LÊN TRONG CLASS PHÂN TRANG
    $('#go_btn').click(function(){
        var page = parseInt($('#goto').val());
        var no_of_pages = parseInt($('.total').attr('a'));
        if(page != 0 && page <= no_of_pages){
            loadData(page);
        }else{
            alert('HÃY NHẬP GIÁ TRỊ TỪ 1 ĐẾN '+no_of_pages);
            $('.goto').val("").focus();
            return false;
        }
    });
	
	
});