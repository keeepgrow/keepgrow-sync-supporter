export const mappingPageScript = {
  pc: `<!--@layout(/layout/basic/layout.html)-->
    <style>
    #mappingLogin #accountConnect .radioBox li label input:after { background-color: unset; box-sizing: border-box; }
    #mappingLogin { border:1px solid #d7d5d5; font-family:굴림; text-align:center; }
#mappingLogin .contents { width:401px; margin:0 auto; margin-bottom: 30px; padding:0 0 10px; }
#mappingLogin .title { margin:28px 0 18px; }
#mappingLogin .text { margin:0; padding:28px 0 18px; color:#353535; font-size:12px; }
#mappingLogin .guide { padding: 28px 0 18px; }
#mappingLogin .radioBox { height:238px;  padding:8px 5px 5px 10px;  border:1px solid #d5d5d5; box-sizing:border-box; text-align:left; }
#mappingLogin .radioBox ul { margin:0; padding:0; }
#mappingLogin .radioBox li { padding:2px 0; color:#353535; font-size:12px; line-height:18px; list-style:none; word-break:break-word; }
#mappingLogin .radioBox li .label { position:relative; display:block; padding:0 0 0 18px; }
#mappingLogin .btn { overflow:hidden; display:block; text-align:center; padding:0 10px; font-size:14px; font-family:굴림; font-weight:bold; line-height:50px; vertical-align:middle; text-decoration:none; white-space:nowrap; border-radius:2px; box-sizing:border-box; cursor:pointer; }
#mappingLogin .btn.btnKakaoSubmit { color:#fff; background-color:#4a5164; }
#mappingLogin .btn.btnNoKakao { color:#333; background-color:#ffe500; }
</style>
<div id="mappingLogin" module="member_loginMapping">
<div class="contents">
<h2 class="title">카카오 연동하기</h2>
<p class="text"><b class="memberEmail">{$provider_member_email}</b>으로 가입된 아이디가 <span class="presenceCheck">{$member_id_exists_desc}</span><br>연동하기 버튼을 누른 후 로그인을 하시면 연동이 완료됩니다.</p>
<div id="accountConnect">
<ul class="radioBox {$display_member_id|display}">
<li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio" checked><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
<li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
<li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
<li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
</ul>
<p class="guide">연동하기 버튼을 누른 후 로그인을 하시면 연동이 완료됩니다.</p>
<a href="#none" onclick="{$kakao_func_login_checked_mapping}" class="btn btnKakaoSubmit {$display_member_id|display}">연동하기</a>
</div>
</div>
<div class="contents">
<a href="#none" onclick="{$kakao_func_login}" class="btn btnNoKakao">연동없이 카카오 1초 회원가입</a>
</div>
</div>`,
  mobile: `<!--@layout(/layout/basic/layout.html)-->
<style>
#mappingLogin #accountConnect .radioBox li label input:after { background-color: unset; box-sizing: border-box; }
#mappingLogin { padding:15px 7px; font-family:"맑은 고딕"; }
#mappingLogin .contents {  margin:17px 0 12px; }
#mappingLogin .title { margin:28px 0 18px; }
#mappingLogin .text { padding:10px 0 13px; }
#mappingLogin .guide { margin:0; padding:17px 0 12px; color:#3a3a3a; font-size:11px; }
#mappingLogin .radioBox { height:270px; padding:9px 14px 9px 14px; border:1px solid #d5d5d5; border-radius:2px; box-sizing:border-box; }
#mappingLogin .radioBox li { padding:5px 0; color:#353535; font-size:11px; line-height:15px; word-break:break-word; }
#mappingLogin .radioBox li .label { position:relative; display:block; min-height:15px; margin:0; color:#3a3a3a; font-size:11px; line-height:15px; cursor:pointer; letter-spacing:-0.4px; }
#mappingLogin .radioBox li .label .radio { width:15px; height:15px; margin:0; border:0; border-radius:50%; background:url("//img.echosting.cafe24.com/skin/mobile_ko_KR/layout/bg_radio.png") no-repeat 0 0; background-size:15px 15px; -webkit-appearance:none; outline-style:none; }
#mappingLogin .radioBox li .label .radio:checked { background-image:url("//img.echosting.cafe24.com/skin/mobile_ko_KR/layout/bg_radio_checked.png"); -webkit-appearance:none; }
#mappingLogin .btn { overflow:hidden; display:block; height:33px; padding:0 10px; font-size:13px; font-family:맑은 고딕; font-weight:bold; line-height:31px; text-align:center; vertical-align:middle; text-decoration:none; white-space:nowrap; border-radius:5px; box-sizing:border-box; cursor:pointer; }
#mappingLogin .btn.btnKakaoSubmit { color:#fefeff; background-color:#4a5164; }
#mappingLogin .btn.btnNoKakao { color:#010101; background-color:#ffe500; }
</style>
<div id="mappingLogin" module="member_loginMapping">
    <div class="contents">
        <h2 class="title">카카오 연동하기</h2>
        <p class="text"><b class="memberEmail">{$provider_member_email}</b>으로 가입된 아이디가 <span class="presenceCheck">{$member_id_exists_desc}</span><br>연동하기 버튼을 누른 후 로그인을 하시면 연동이 완료됩니다.</p>
        <div id="accountConnect">
            <ul class="radioBox {$display_member_id|display}">
                <li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio" checked><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
                <li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
                <li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
                <li><label class="label"><input type="radio" name="login_mapping_info" value="{$member_id}" class="radio"><span> {$masking_member_id} (가입일 {$regist_date})</span></label></li>
            </ul>
            <p class="guide">연동하기 버튼을 누른 후 로그인을 하시면 연동이 완료됩니다.</p>
            <a href="#none" onclick="{$kakao_func_login_checked_mapping}" class="btn btnKakaoSubmit {$display_member_id|display}">연동하기</a>
        </div>
    </div>
    <div class="contents">
        <a href="#none" onclick="{$kakao_func_login}" class="btn btnNoKakao">연동없이 카카오 1초 회원가입</a>
    </div>
</div>`
};

export const scriptContent = {
  CAFE24: (src, dataEnv = false) =>
    `<!-- KeepGrow 1초 회원가입 Script --> 
<!--  
======================================================================================================================= 
  <KeepGrow 1초 회원가입 Script에 대한 안내사항> 
  - 본 스크립트는 저작권이 있는 자산으로, 다른 멀티 쇼핑몰(국내몰 및 외국어몰)에 무단 복제, 배포 등의 행위를 할 시 관련 법에 따라 제재를 받을 수 있습니다.
  - 해당 스크립트 변조로 인해 발생된 모든 오류 및 장애에 대해 당사는 책임지지 않으며, 서비스 이용에 차질이 생길 수 있습니다.
  - 이용 관련 문의 및 수정요청은 고객센터 https://pf.kakao.com/_fVBgT/chat로 문의 부탁드립니다.
========================================================================================================================
-->
<div module="member_login" style="display:none !important"></div>
<script id="kg-service-init" data-hosting="cafe24" src="${src}" ${dataEnv ? 'data-env="mobile"' : ""}></script>
<!-- KeepGrow 1초 회원가입 Script -->`
};
