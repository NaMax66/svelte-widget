(
	function(){
		var numberInput=document.querySelector(".avtocod-form__input");
		var t=0;
		var a;
		var placeholders=["JN1WNYD21U0000001","А001АА777"];

		document.addEventListener("click",function(a) {
			if(a.target.className.indexOf("avtocod-form__toggle-btn")>=0){
			var o=a.target;
			var l="avtocod-form__toggle-btn_active";
			if(o.className.indexOf(l)>=0){
				return true
			}
			var s=document.getElementsByClassName(l)[0];
			if(s){s.className=s.className.replace(l,"")}
			o.className=o.className+" "+l;
			t=o.className.indexOf("avtocod-form__toggle-btn_vin")>=0 ? 0 : 1;
			numberInput.placeholder=placeholders[t];
			c(numberInput);
			n(numberInput)
			}
		}
		);
	document.addEventListener("change",function(t){
		if(t.target.className.indexOf("avtocod-form__input")>=0){
			if(!testGRZ(numberInput.value)){
				showHint(numberInput)
			}
			else{
				n(numberInput)
			}
		}
	});
	document.addEventListener("keyup",function(t){
		if(t.target.className.indexOf("avtocod-form__input")>=0){
			var submitBtn=document.querySelector(".avtocod-form__submit-btn");
			if(!testGRZ(numberInput.value)){
				submitBtn.disabled=true
			}else{
				submitBtn.disabled=false
			}
		}
	});

	document.querySelector(".avtocod-form").addEventListener("submit",function(t){
		t.preventDefault();
		if(!testGRZ(numberInput.value)) return

		showHint(numberInput);
		var a=t.target;
		var r=a.querySelector(".avtocod-form__input").value;
		    r = r.toUpperCase();
		var n=["utm_source="+location.hostname,"utm_medium=cpa","utm_campaign=form"];n=n.join("&");
		var form_action=this.action;
		var params = form_action.split('?', 2);
		var ep = (params[1]) ? params[1]+'&':'';
		window.open("https://avtocod.ru/proverkaavto/"+r+"?"+ep+n);
		return false
	});

	function showHint(e){
		var r=e.parentNode;
		var o=document.querySelector(".arrow-box");
		var l=document.getElementsByClassName("arrow-box__text");
		var c=l[t];
		c.className=c.className.replace("arrow-box__text_hidden","");
		r.style.position="relative";o.style.left=s(0);
		o.style.top=s(e.offsetHeight+5);
		o.style.width=s(e.offsetWidth);
		o.style.display="inline-block";
		a=setTimeout(function(){
			n(e)
		},5e3)
	}

	function n(e){
		if(a){
			clearTimeout(a);
			a=null
		}
		var t=e.parentNode;
		var r=t.querySelector(".arrow-box");
		var o=document.getElementsByClassName("arrow-box__text");
		var n="arrow-box__text_hidden";
		r.style.display="none";

		for(var l=o.length-1;l>=0;l--){
			if(o[l].className.indexOf(n)===-1){
				o[l].className+=" "+n
			}
		}
	}
	function testGRZ(GRZ){
		var a=/^[а-яА-Яa-zA-Z][0-9]{3}[а-яА-Яa-zA-Z]{2}[0-9]{2,3}$/;
		var r=/^[0-9A-Za-zА-Яа-я]{17}$/;
		if(!t&&!r.test(GRZ)) return false;
		if(t&&!a.test(GRZ)) return false;
		return true
	}
	function s(e){
		return e+"px"
	}
	function c(e){
		e.value=""
	}
})();
