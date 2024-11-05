$(function() {
	const userEno = $('#userEno').val();
	createNav(userEno);
});

/**
 * 왼쪽 네비게이션 메뉴 생성
 * @param {String} empNo
 */
function createNav (empNo) {

	let param = empNo

	console.log("네비게이션 만들기");
	console.log("empNo: "+empNo);

	$.ajax({
		type: "POST",
		url: "/createRamsNav",
		contentType: "application/json; charset=UTF-8", // 수정된 contentType
    	data: param,
		success: function (data) {
			let navHtml;
			if(data.length > 0){
				for(let i = 0; i < data.length; i++) {

					/**
					 * @param {String} menuId 메뉴ID
					 * @param {String} menuNm 메뉴명
					 * @param {String} hgrkMenuId 상위메뉴ID
					 * @param {String} scrnAplyShpCd 화면적용형태코드
					 * @param {String} menuLvl 메뉴레벨
					 */

					/**
					 * 최상위 메뉴일 경우
					 */
					if(data[i].menuLvl === 1 && !data[i].hgrkMenuId){
						const menuHtmlLv1 = `
							<li>
								<a href="#" aria-expanded="false">
									<i class="fa fa-folder-open-o"></i>
									<span class="nav-label">${data[i].menuNm}</span>
									<span class="fa arrow"></span>
								</a>
								<ul class="nav nav-second-level collapse" aria-expanded="false" data-hgrk="${data[i].menuId}">
								</ul>
							</li>
						`
						$(`#side-menu`).append(menuHtmlLv1);
					} 
					/**
					 * 메뉴레벨 2인 경우
					 */
					else if (data[i].menuLvl === 2){
						let menuHtmlLv2;
						/**
						 * 형태가 메뉴일 경우
						 */
						if(data[i].scrnAplyShpCd === 'M'){
							menuHtmlLv2 = `
								<li>
									<a class="left-ex" aria-expanded="false">${data[i].menuNm}<span class="fa arrow"></span></a>
									<ul class="nav nav-third-level collapse" aria-expanded="false" style="height: 0px;" data-hgrk="${data[i].menuId}">
									</ul>
								</li>
							`;
						}
						/**
						 * 형태가 화면일 경우
						 */
						else if(data[i].scrnAplyShpCd === 'S'){
							menuHtmlLv2 = `
								<li data-sidetabid="${data[i].menuId}">
									<a onclick="callPage('${data[i].menuId}', '${data[i].menuNm}')">${data[i].menuNm}</a>
								</li>
							`;
						}
						$(`#side-menu ul[data-hgrk="${data[i].hgrkMenuId}"]`).append(menuHtmlLv2);
					}
					/**
					 * 메뉴 3레벨일 경우
					 */
					else if(data[i].menuLvl === 3){
						const menuHtmlLv3 = `
							<li data-sidetabid="${data[i].menuId}">
								<a onclick="callPage('${data[i].menuId}', '${data[i].menuNm}')">&nbsp;&nbsp;${data[i].menuNm}</a>
							</li>
						`;
						$(`#side-menu ul ul[data-hgrk="${data[i].hgrkMenuId}"]`).append(menuHtmlLv3);
					}


				}
				$('#side-menu').metisMenu();
			} else {
				Swal.fire({
					icon: 'warning'
					, title: '권한이 없습니다!'
				}).then(function(){
					window.location.href = "/login"
				})
			}
		}, error: function () {
			
		}
	});
}