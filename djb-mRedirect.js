/////////////////////////   djb-mRedirect
/////////////////////////   
////      _ _ _      ////   Author: Devin Barth
////     | (_) |     ////   Site: MrDevinB.com
////   __| |_| |__   ////   Version: 2.1.4
////  / _` | | '_ \  ////   
//// | (_| | | |_) | ////   Copyright (c) 2011 Devin Barth
////  \__,_| |_.__/  ////   Licensed under GPL
////      _/ |       ////   Date: 5/7/12
////     |__/        ////   
/////////////////////////   Usage: mRedirect({optional settings});
/////////////////////////   
/*
 *    Settings:
 *         subdomain:         boolean() default false, to have your mobile site redirect to a subdomain set value to true
 *         directory:         string() default mobile
 *         tablet_redirect:   boolean() default false, if you would like tablet devices to forward to mobile site set value to true
 *         fs_link_id:        string() default fullsite, set to id of link to view fullsite.
 *         cookie_name:       string() default mRedirect, name of cookie set when going from mobile site to fullsite
 *         cookie_val:        value of the cookie default true
 *         days:              number in days before cookie expires. default 1
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *    
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *    
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

mRedirect = function(options) {
    var settings = {
        'subdomain' : false,
        'root' : null,
        'directory' : 'mobile',
        'tablet_redirect' : false,
        'fs_link_id' : 'fullsite',
        'cookie_name' : 'mRedirect',
        'cookie_val' : true,
        'days' : 1
    }
    if(options){for(var key in options){settings[key] = options[key];}}
    
    var c=settings.tablet_redirect,
        e=settings.cookie_name,
        f=settings.cookie_val,
        g=settings.days,
        pc = window.location.protocol+'//',
        hn = (settings.root)? window.location.hostname+'/'+settings.root : window.location.hostname,
        pn=window.location.pathname,
        qh=window.location.search+window.location.hash,
        mURL;
    console.log(pn);
    
    var regex = new RegExp('^(\/)?'+(( !settings.subdomain && settings.root )? settings.root : '' )+'(\/)?'+settings.directory,'i');
    
    mURL = (settings.subdomain)? !!(hn.match(regex)) : !!(pn.match(regex));
    
    var ua = navigator.userAgent.toLowerCase(),isM =!!(ua.match(/(iPhone|iPod|blackberry|android 0.5|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i)),isT =!!(ua.match(/(iPad|SCH-I800|xoom|kindle|tablet)|(android)(?!.*mobile)/i));
    
    if( (!isM || (isT && !c)) && mURL ){
        var url = (settings.subdomain)? hn.replace(settings.directory,'www') : hn;
        redirect(url);
    } else if( ((isM && isT && c) || (isM && !isT)) && !mURL && !rC(e) ){
        var url = (settings.subdomain)? settings.directory+'.' + hn.replace('www.', '') : hn+'/'+settings.directory;
        redirect(url);
    } else {
        /*Your exactly where you need to be.*/
    }
    
    function redirect(url){
        var url = pc+url+qh;
        if(!!(location.search.match(/\?debug/))){
            alert(url);
        } else {
            document.location = url;
        }
    }
    
    if(isM && mURL){
        window.onload = function(){
            var link = document.getElementById('fullsite');
            if(link!=null){
                document.getElementById('fullsite').onclick = function(){
                    cC(e,f,g);
                    var url = (settings.subdomain)? hn.replace(settings.directory,'www') : hn;
                    redirect(url);
                    return false;
                }
            }
        }
    }
}

if(typeof console=='undefined') {
	window.console={
		log: function(){}
	}
}

function cC(n,v,d) {
    var ex;
	if (d) {
		var D = new Date();
		D.setTime(D.getTime()+(d*24*60*60*1000));
		ex = "; expires="+D.toGMTString();
	}
	else {ex = "";}
	document.cookie = n+"="+v+ex+"; path=/";
}

function rC(n) {
	var N=n+"=",ca=document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c=ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(N) == 0) return c.substring(N.length,c.length);
	}
	return null;
}

function eC(n) {cC(n,"",-1);}