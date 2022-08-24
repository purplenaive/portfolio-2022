"use strict";(self["webpackChunkportfolio_2022"]=self["webpackChunkportfolio_2022"]||[]).push([[960],{8960:function(t,e,a){a.r(e),a.d(e,{default:function(){return Q}});var c=a(3396),i=a(7139),o=a(9242);const r=t=>((0,c.dD)("data-v-7750f720"),t=t(),(0,c.Cn)(),t),s={class:"main page project-page"},l={class:"project-wrapper"},n={key:0,class:"project__view"},_={class:"view__title"},p=r((()=>(0,c._)("i",{class:"icon folder-open deep-blue"},null,-1))),d={class:"title__text"},u={class:"view__info-list"},g={class:"info__item"},v=r((()=>(0,c._)("div",{class:"info__title"},[(0,c._)("i",{class:"icon code"}),(0,c._)("span",{class:"title__text"},"프로젝트")],-1))),j={class:"info__value"},m={class:"view__contribution"},y={class:"info__item"},w=r((()=>(0,c._)("div",{class:"info__title"},[(0,c._)("i",{class:"icon calendar"}),(0,c._)("span",{class:"title__text"},"작업기간")],-1))),h={class:"info__value"},f=["innerHTML"],k={class:"view__tools-list"},x={class:"view__actions"},b=["href"],D=r((()=>(0,c._)("i",{class:"icon git small"},[(0,c._)("span",{class:"sr-only"},"깃 페이지 이동하기")],-1))),C=[D],z=["href"],q=["href"],P={class:"project-list-wrapper"},H={class:"project__category-wrapper"},L={class:"category__title"},$=r((()=>(0,c._)("i",{class:"icon list-square"},null,-1))),I={key:0,class:"title__text"},K={key:1,class:"title__text"},S={key:2,class:"title__text"},Y={key:3,class:"title__text"},A={class:"project__category",role:"radio"},F=["onUpdate:modelValue","value"],T={class:"category__text"},U={id:"contents-wrap",class:"project-list"},B=["data-project-index","onClick"],E=r((()=>(0,c._)("div",{class:"project__icons"},[(0,c._)("i",{class:"icon folder","aria-hidden":"true"}),(0,c._)("i",{class:"icon folder deep-blue","aria-hidden":"true"})],-1))),G={class:"project__title"},M={class:"project__tag-list"},V=r((()=>(0,c._)("div",{class:"project__icons router-icon"},[(0,c._)("i",{class:"icon arrow-right","aria-hidden":"true"}),(0,c._)("i",{class:"icon arrow-right deep-blue","aria-hidden":"true"})],-1)));function Z(t,e,a,r,D,Z){return(0,c.wg)(),(0,c.iD)("main",s,[(0,c._)("section",l,[D.project.active.data.id?((0,c.wg)(),(0,c.iD)("article",n,[(0,c._)("p",_,[p,(0,c._)("span",d,(0,i.zw)(D.project.active.data.title),1)]),(0,c._)("ul",u,[(0,c._)("li",g,[v,(0,c._)("p",j,[(0,c.Uk)((0,i.zw)(D.project.active.data.name)+" ",1),(0,c._)("span",m,"(기여도 "+(0,i.zw)(D.project.active.data.contribution)+"%)",1)])]),(0,c._)("li",y,[w,(0,c._)("p",h,(0,i.zw)(D.project.active.data.date.start)+" ~ "+(0,i.zw)(D.project.active.data.date.end)+" ("+(0,i.zw)(D.project.active.data.date.period)+") ",1)])]),(0,c._)("pre",{class:"view__summary",innerHTML:D.project.active.data.summary},null,8,f),(0,c._)("ul",k,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(D.project.active.data.tools,(t=>((0,c.wg)(),(0,c.iD)("li",{key:t,class:"tool__item"},"#"+(0,i.zw)(t),1)))),128))]),(0,c._)("div",x,[(0,c._)("a",{href:D.project.active.data.links.git,class:(0,i.C_)(["action__button common-button fab",{disabled:!D.project.active.data.links.git}]),target:"_blank",title:"깃 페이지 이동하기"},C,10,b),(0,c._)("a",{href:D.project.active.data.url,class:(0,i.C_)(["action__button common-button",{disabled:!D.project.active.data.url}]),target:"_blank"},"설명 보기",10,z),(0,c._)("a",{href:D.project.active.data.links.page,class:(0,i.C_)(["action__button common-button active",{disabled:!D.project.active.data.links.page}]),target:"_blank"},"페이지",10,q)])])):(0,c.kq)("",!0),(0,c._)("article",P,[(0,c._)("div",H,[(0,c._)("div",L,[$,"all"==D.project.active.category?((0,c.wg)(),(0,c.iD)("span",I,"제가 작업한 모든 프로젝트입니다")):"company"==D.project.active.category?((0,c.wg)(),(0,c.iD)("span",K,"재직 중 진행했던 프로젝트입니다")):"side"==D.project.active.category?((0,c.wg)(),(0,c.iD)("span",S,"재직 중 개인적으로 진행했던 프로젝트입니다")):"practice"==D.project.active.category?((0,c.wg)(),(0,c.iD)("span",Y,"퍼블리셔가 되기 전 작업했던 작업물입니다")):(0,c.kq)("",!0)]),(0,c._)("form",A,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(D.project.category,(t=>((0,c.wg)(),(0,c.iD)("label",{key:t.id,class:"category__item"},[(0,c.wy)((0,c._)("input",{type:"radio",class:"category__radio","onUpdate:modelValue":t=>D.project.active.category=t,value:t.id,name:"category"},null,8,F),[[o.G2,D.project.active.category]]),(0,c._)("span",T,(0,i.zw)(t.name),1)])))),128))])]),(0,c._)("ul",U,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(D.project.data,((t,e)=>(0,c.wy)(((0,c.wg)(),(0,c.iD)("li",{key:t.id,class:(0,i.C_)(["project__item",[`project-${t.category}`,{"project--active":D.project.active.index==e}]]),"data-project-index":e,onClick:e=>Z.selectProject(e,t)},[E,(0,c._)("h4",G,(0,i.zw)(t.title),1),(0,c._)("p",M,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(t.tags,(t=>((0,c.wg)(),(0,c.iD)("span",{key:t,class:"tag__item"},"#"+(0,i.zw)(t),1)))),128))]),V],10,B)),[[o.F8,Z.projectFilter(t.category)]]))),128))])])])])}var J={name:"projectPage",data(){return{project:{active:{active:!1,category:"company",data:{},index:0},category:[{name:"전체",id:"all"},{name:"재직 프로젝트",id:"company"},{name:"사이드 프로젝트",id:"side"},{name:"연습",id:"practice"}],data:[]}}},methods:{getProjects(){this.$axios.get("/project/api/project").then((t=>{this.trimProjects(t.data)})).catch((t=>{console.log(t)}))},trimProjects(t){const e=this.project,a=t.map(((t,a)=>{const c=t.properties,i=c["작업 날짜"].date,o=c["태그"].multi_select.map((t=>t.name)),r=c["사용 툴"].multi_select.map((t=>t.name)),s=c.category.select?c.category.select.name:"",l={id:t.id,url:t.url,title:c.title.rich_text[0].plain_text,name:c.name.rich_text[0].plain_text,category:s,date:{start:i.start.replaceAll("-",".").slice(2),end:i.end?i.end.replaceAll("-",".").slice(2):"",period:c["작업 기간"].rich_text[0].plain_text},summary:c["간단 설명"].rich_text[0].plain_text,links:{git:c.Git.url,page:c["페이지"].url},contribution:c["기여도"].number,tags:o,tools:r};return void 0==e.active.data.id&&"company"==s&&(e.active.data=l,e.active.index=a),l}));e.data=a,e.active.active=!0},selectCategory(t){const e=this.project,a=document.getElementById("contents-wrap"),c="project--active",i=a.querySelector(`.${c}`),o="all"==t?a.querySelector(".project__item"):a.querySelectorAll(`.project-${t}`)[0],r="all"==t?0:o.dataset.projectIndex;e.active.index=-1,i.classList.remove(c),e.active.category=t,o.classList.add(c),e.active.data=e.data[r]},projectFilter(t){const e=this.project.active.category;return"all"==e||e==t},selectProject(t,e){const a=this.project,c="project--active",i=document.getElementById("contents-wrap"),o=i.querySelector(`.${c}`);a.active.data=e,o.classList.remove(c),t.currentTarget.classList.add(c)}},mounted(){this.getProjects()},watch:{"project.active.category":{deep:!0,handler(t){this.selectCategory(t)}}}},N=a(89);const O=(0,N.Z)(J,[["render",Z],["__scopeId","data-v-7750f720"]]);var Q=O}}]);
//# sourceMappingURL=960.2c8b1de7.js.map