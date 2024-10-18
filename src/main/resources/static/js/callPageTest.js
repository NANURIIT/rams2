

function callPageTest(menuId, pageName) {

    const url = window.location.pathname;
    console.log(url);

    if(url === "/" + menuId){
        return;
    }

    history.pushState(null, '', '/' + menuId);

    // AJAX 요청으로 해당 콘텐츠를 가져옴
    $.ajax({
        url: '/' + menuId, // 서버에서 해당 페이지에 맞는 콘텐츠를 가져올 URL
        method: 'GET',
        success: function (response) {

            // $(response).find('div[data-menuId*="TB"]').remove();

            const customContent = $(response).find(`div[data-menuId="/${menuId}"]`).html();

            let $this = $(response);

            // if($(`div[data-menuId="${menuId}"]`).length > 0){
            //     $(`#${menuId}`).css('visibility', 'visible')
            //     return;
            // }else {
            // }

            $('#myTab').append(`
                    <li class="nav-item main-tab" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target=""
                                type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" onclick="moveTab('${menuId}');">${pageName}</button>
                    </li>
                `)

            $('#page-wrapper div[data-menuId*="TB"]').hide()

            // $(`#page-wrapper`).append(`<div data-menuId="/${menuId}"></div>`);
            $(`div[data-menuId*="/TB"]`).last().after(`<div data-menuId="/${menuId}"></div>`);

            const $modals = $('.modal.fade');
            const $script = $('script');

            for(let i = 0; i < $this.length; i++) {
                if($($this[i]).attr('class') === 'modal fade') {
                    let isDuplicateModal = false;
                    for(let j = 0; j < $modals.length; j++){
                        if($($this[i]).attr('id') === $($modals[j]).attr('id')){
                            isDuplicateModal = true;
                            break;
                        }
                    }
                    if (!isDuplicateModal) {
                        $('#wrapper').after($this[i]); // 중복된 스크립트가 아니면 body에 추가
                    }
                    // modalContents.push($this[i])
                }
                else if($($this[i]).attr('src') != "" && $($this[i]).attr('src') != undefined){
                    let isDuplicateScript = false;
                    for(let j = 0; j < $script.length; j++){
                        if($($this[i]).attr('src') === $($script[j]).attr('src')){
                            isDuplicateScript = true;
                            break;
                        }
                    }
                    if (!isDuplicateScript) {
                        $('body').append($this[i]); // 중복된 스크립트가 아니면 body에 추가
                    }
                }
            }

            $(`div[data-menuId="/${menuId}"]`).html(customContent);
        },
        error: function () {
            console.error('페이지 로드 중 오류가 발생했습니다.');
        }
    });

}

function moveTab (menuId){
    $(`div[data-menuId*="TB"]`).hide()
    $(`div[data-menuId="/${menuId}"]`).show()
}

// // $(function(){ 		
// // 	alert("111");
// // 	maintab = $( "#tabs" ).tabs({
// //         add: function(e, ui) {
// //             // append close thingy
// //             $(ui.tab).parents('li:first')
// //                 .append('<i class="fa fa-close" role="presentation"></i>')
// //                 .find('i.fa-close')
// //                 .click(function() {
// //                     maintab.tabs('remove', $('li', maintab).index($(this).parents('li:first')[0]));
// //                 });
// //             // select just added tab
// //             maintab.tabs('select', '#' + ui.panel.id);
// //         }
// //     });
// // });
// function loadMenuContent(url) {
	
// 	alert('222');
//         $.ajax({
//             url: url,
//             type: 'GET',
//             success: function(data) {
//                 // 받아온 데이터를 이용하여 화면 업데이트
//                 $('#content-container').html(data);
//             },
//             error: function() {
//                 alert('데이터를 불러오는 중 오류가 발생했습니다.');
//             }
//         });
//     }
// function openNewTab(menuNum){
// 	parent.add_menu_tab(menuNum);
// }
 
//  function add_menu_tab(menuId){
	
// 	var menuUrl = "/" + menuId + "/" + userAuth;
// 	var st = "#t"+tabCounter;
// 	var menuName = " ";
// 	//maintab.tabs('add',st, menuId.substring(2,6));
// 	$.ajax({
// 			type : 'POST',
// 			url : 'searchMenuName',
// 			data : { menuId : menuId } ,
// 			async : false ,
// 			success : function( data ){
// 				if( data.result == responseCode.SUCCESS ){
// 					menuName = data.menuName ;
// 				}
// 			}
// 		});
// 	maintab.tabs('add',st, menuName);
// 	var innerHtml = '<iframe src="'+menuUrl+'" width="1550px" height="770px" scrolling="auto" frameborder="0" marginheight="0" marginwidth="0" hspace="0" vspace="0" onload="loadTabIframe(this);"></iframe>';
// 	$(st,"#tabs").append(innerHtml);
// 	maintab.tabs('select',st);
// 	tabCounter ++ ;
// 	$('.sub').hide();
// }   

// function loadTabIframe(obj) {
// 	obj.contentWindow.document.body.style.overflowX='hidden';
// }