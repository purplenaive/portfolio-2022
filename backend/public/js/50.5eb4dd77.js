"use strict";(self["webpackChunkportfolio_2022"]=self["webpackChunkportfolio_2022"]||[]).push([[50],{8050:function(t,e,a){a.r(e),a.d(e,{default:function(){return C}});var s=a(3396),n=a(7139);const o=t=>((0,s.dD)("data-v-a414f34e"),t=t(),(0,s.Cn)(),t),i={class:"main page note-page"},r={class:"notes-wrapper"},l={class:"note-list"},c=["href"],u={class:"note-paper note__title"},d=o((()=>(0,s._)("i",{class:"icon note","aria-hidden":"true"},null,-1))),_={class:"title__text"},p={class:"note-paper note__summary"},m={class:"summary__text"},g={key:0,class:"note__status"},h={key:0,class:"status--in-progress"},w={key:1,class:"status--not-started"},f=o((()=>(0,s._)("i",{class:"icon pencil gray"},null,-1))),k=o((()=>(0,s._)("i",{class:"icon arrow-right deep-blue view-more-icon","aria-hidden":"true"},null,-1))),b=o((()=>(0,s._)("a",{href:"https://purplenaive.notion.site/d1619275de714a158cc8d90bef99ddb4?v=83e98783aabf4d8bb7a2e36cef5a7829",target:"_blank",class:"note__item note-view-all-button common-button outlined"},[(0,s.Uk)(" 글 전체 보러가기 "),(0,s._)("i",{class:"icon arrow-right view-more-icon deep-blue","aria-hidden":"true"})],-1)));function v(t,e,a,o,v,y){return(0,s.wg)(),(0,s.iD)("main",i,[(0,s._)("section",r,[(0,s._)("section",l,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(v.note.data,(t=>((0,s.wg)(),(0,s.iD)("article",{key:t.id,class:"note__item"},[(0,s._)("a",{href:t.url,target:"_blank",class:"inner"},[(0,s._)("p",u,[d,(0,s._)("span",_,(0,n.zw)(t.title),1)]),(0,s._)("div",p,[(0,s._)("span",m,(0,n.zw)(t.summary),1),"done"!==t.status.toLowerCase()?((0,s.wg)(),(0,s.iD)("p",g,["in progress"==t.status?((0,s.wg)(),(0,s.iD)("span",h,"작성 중")):(0,s.kq)("",!0),"Not started"==t.status?((0,s.wg)(),(0,s.iD)("span",w,"작성 예정")):(0,s.kq)("",!0),f])):(0,s.kq)("",!0)]),k],8,c)])))),128)),b])])])}var y={name:"noteCards",data(){return{note:{data:[]}}},methods:{getNotes(){this.$axios.get("/note/api/note").then((t=>{this.trimNotes(t.data)})).catch((t=>{console.log("get noets error: ",t)}))},trimNotes(t){const e=t.map((t=>{const e=t.properties,a=e["개요"].rich_text.length?e["개요"].rich_text[0].plain_text:"";return console.log(t),{id:t.id,url:t.url,title:e["제목"].title[0].plain_text,summary:a,status:e["작성"].status?e["작성"].status.name:"done"}}));this.note.data=e}},mounted(){this.getNotes()}},x=a(89);const D=(0,x.Z)(y,[["render",v],["__scopeId","data-v-a414f34e"]]);var C=D}}]);
//# sourceMappingURL=50.5eb4dd77.js.map