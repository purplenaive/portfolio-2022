<template>
  <main class="main page project-page">
    <section class="project-wrapper">
      <!-- 프로젝트 자세히 보기 -->
      <article class="project__view" v-if="project.active.data.id">
        <p class="view__title">
          <i class="icon folder-open deep-blue" aria-hidden="true"></i>
          <span class="title__text">{{project.active.data.title}}</span>
        </p>
        <ul class="view__info-list">
          <li class="info__item">
            <div class="info__title">
              <i class="icon code" aria-hidden="true"></i>
              <span class="title__text">프로젝트</span>
            </div>
            <p class="info__value">
                {{project.active.data.name}}
                <span class="view__contribution">(기여도 {{project.active.data.contribution}}%)</span>
              </p>
          </li>
          <li class="info__item">
            <div class="info__title">
              <i class="icon calendar" aria-hidden="true"></i>
              <span class="title__text">작업기간</span>
            </div>
            <p class="info__value">
              {{project.active.data.date.start}} ~ 
              {{project.active.data.date.end}}
              ({{project.active.data.date.period}})
            </p>
          </li>
        </ul>
        <p class="view__summary" v-html="project.active.data.summary"></p>
        <ul class="view__tools-list">
          <li 
            v-for="tool in project.active.data.tools"
            :key="tool"
            class="tool__item"
          >#{{tool}}</li>
        </ul>
        <div class="view__actions">
          <a 
            :href="project.active.data.links.git" 
            class="action__button common-button button--fab"
            :class="{'button--disabled': !project.active.data.links.git}"
            target="_blank"
            title="깃 페이지 이동하기"
          >
            <i class="icon git small"><span class="sr-only">깃 페이지 이동하기</span></i>
            <span class="button__text--mobile" aria-hidden="true">GIT</span>
          </a>
          <a 
            :href="project.active.data.url" 
            class="action__button common-button"
            :class="{'button--disabled': !project.active.data.url}"
            target="_blank"
            >설명 보기</a>
            <a 
            :href="project.active.data.links.page" 
            class="action__button common-button button--active visit-page-button"
            :class="{'button--disabled': !project.active.data.links.page}"
            target="_blank"
          >페이지</a>
        </div>
      </article>

      <article class="project-list-wrapper">
        <!-- 프로젝트 카테고리 -->
        <div class="project__category-wrapper">
          <div class="category__title">
            <i class="icon list-square" aria-hidden="true"></i>
            <span v-if="project.active.category == 'all'" class="title__text">제가 작업한 모든 프로젝트입니다</span>
            <span v-else-if="project.active.category == 'company'" class="title__text">재직 중 진행했던 프로젝트입니다</span>
            <span v-else-if="project.active.category == 'side'" class="title__text">재직 중 개인적으로 진행했던 프로젝트입니다</span>
            <span v-else-if="project.active.category == 'practice'" class="title__text">퍼블리셔가 되기 전 작업했던 작업물입니다</span>
          </div>
          <form class="project__category" role="radio">
            <label 
              v-for="category in project.category"
              :key="category.id"
              class="category__item"
            >
              <input 
                type="radio" 
                class="category__radio" 
                v-model="project.active.category"
                :value="category.id"
                name="category" 
              >
              <span class="category__text">{{category.name}}</span>
            </label>
          </form>
        </div>
        <!-- 프로젝트 리스트 -->
        <ul id="contents-wrap" class="project-list">
          <li 
            v-for="pj, pj_index in project.data"
            :key="pj.id"
            v-show="projectFilter(pj.category)"
            class="project__item"
            :class="[`project-${pj.category}`, {
              'project--active': project.active.index == pj_index,
            }]"
            :data-project-index="pj_index"
            @click="event => selectProject(event, pj)"
          >
            <div class="project__icons">
              <i class="icon folder" aria-hidden="true"></i>
              <i class="icon folder deep-blue" aria-hidden="true"></i>
            </div>
            <h4 class="project__title">{{pj.title}}</h4>
            <p class="project__tag-list">
              <span v-for="tag in pj.tags" :key="tag" class="tag__item">#{{tag}}</span>
            </p>
            <div class="project__icons router-icon">
              <i class="icon arrow-right" aria-hidden="true"></i>
              <i class="icon arrow-right deep-blue" aria-hidden="true"></i>
            </div>
          </li>
        </ul>
      </article>
    </section>
    <loading-spinner :active="loading"></loading-spinner>
  </main>
</template>

<script>
  import loadingSpinner from "@/components/loadingSpinner.vue";

  export default {
    name: "projectPage",
    components: {
      loadingSpinner,
    },
    data() {
      return {
        project: {
          active: {
            active: false,
            category: "company",
            data: {},
            index: 0,
          },
          category: [
            {name: "전체", id: "all"},
            {name: "재직 프로젝트", id: "company"},
            {name: "사이드 프로젝트", id: "side"},
            {name: "연습", id: "practice"},
          ],
          data: [],
        },
        loading: true,
      };
    },
    methods: {
      getProjects() { // 프로젝트 가져오기
        this.loading = true;

        this.$axios.get("/project/api/project")
          .then(res => {
            this.trimProjects(res.data);
          })
          .catch(err => {
            console.log(err);
          })
      },
      trimProjects(data) { // 가져온 프로젝트 필요한 정보만 가공
        const project = this.project;

        const result = data.map((value, index) => {
          const properties = value.properties;
          const date = properties["작업 날짜"].date;
          const tags = properties["태그"].multi_select.map(item => item.name);
          const tools = properties["사용 툴"].multi_select.map(item => item.name);
          const category = properties.category.select ? properties.category.select.name : "";
          const period =  properties["작업 기간"].rich_text;
          const summary = properties["간단 설명"].rich_text;
          let back_link = properties.back_link.rich_text;
          let back_link_length = back_link.length;
          
          if(back_link_length) {
            back_link.map(value => {
              if(value.type == "mention") {
                back_link = value.href;
              }
            })
          } else {
            back_link = "";
          }

          const object = {
            id: value.id,
            url: back_link,
            title: properties.title.rich_text[0].plain_text,
            name: properties.name.rich_text[0].plain_text,
            category,
            date: {
              start: date.start.replaceAll("-", ".").slice(2),
              end: date.end ? date.end.replaceAll("-", ".").slice(2) : "",
              period: period.length ? period[0].plain_text : "",
            },
            summary: summary.length ? summary[0].plain_text : "",
            links: {
              data_url: value.url,
              git: properties.Git.url,
              page: properties["페이지"].url,
            },
            contribution: properties["기여도"].number,
            tags,
            tools,
          }
          if( project.active.data.id == undefined && category == "company" ) {
            // 첫 로딩시에만 적용될 선택된 프로젝트
            project.active.data = object;
            project.active.index = index;
          }
          return object;
        })
        project.data = result;
        project.active.active = true;
        this.loading = false;
      },
      selectCategory(category) { // 프로젝트 보여질 카테고리 변경
        const project = this.project;
        const contents_wrap = document.getElementById("contents-wrap");
        const active_class = "project--active";
        // 활성화 시킬 project__item dom 가져오는 변수들
        const active_item = contents_wrap.querySelector(`.${active_class}`);
        const active_target = category == "all" ? 
                              contents_wrap.querySelector(".project__item") :
                              contents_wrap.querySelectorAll(`.project-${category}`)[0];
        const target_index = Number(active_target.dataset.projectIndex);
        const active_index = category == "all" ? 0 : target_index;

        if(target_index === Number(active_item.dataset.projectIndex)) return;

        project.active.index = active_index;
        active_item.classList.remove(active_class);
        project.active.data = project.data[active_index];
      },
      projectFilter(category) { // 가져온 프로젝트 선택한 카테고리에 따라 보여주기
        const selected = this.project.active.category;
        
        if(selected == "all") return true;
        return selected == category;
      },
      selectProject(event, data) { // 선택한 프로젝트 자세히 보기
        const project = this.project;
        const target = event.currentTarget;
        const active_class = "project--active";
        const contents_wrap = document.getElementById("contents-wrap");
        const active_item = contents_wrap.querySelector(`.${active_class}`);

        if(target.classList.contains(active_class)) return;

        project.active.data = data;
        project.active.index = -1;
        active_item.classList.remove(active_class);
        target.classList.add(active_class);
      }
    },
    mounted() {
      this.getProjects();
    },
    watch: {
      "project.active.category": { // category 변경 감지
        deep: true,
        handler(now) {
          this.selectCategory(now);
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .project-wrapper {
    @include section-1200(false);
  }

  // *********** project view *********** //
  .project__view {
    @include card;
    @include flex(false, column, wrap, flex-start, unset);

    gap: 20px;
    align-content: space-between;
    height: 250px;
    padding: 32px;
    background-color: rgba($deep-blue, 0.08);

    @include responsive-custom(1024) {
      height: unset;
      flex-wrap: nowrap;
    }
    @include responsive-mobile {
      padding: 24px;
    }

    .view__title {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 12px;

      .icon {
        @include icon-custom(32);
      }
      .title__text {
        font-size: 20px;
        color: $deep-blue;
        font-weight: $font-b;
      }
    }

    .view__info-list {

      .info__item {
        @include flex(false, row, nowrap, flex-start, center);

        line-height: 1.6;

        @include responsive-mobile {
          flex-wrap: wrap;  
          margin-bottom: 8px;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      .info__title {
        @include flex(false, row, nowrap, flex-start, center);

        width: 105px;
        gap: 6px;

        @include responsive-mobile {
          width: 100%; 
        }
      }
      .info__value {
        color: $text-gray;

        @include responsive-mobile {
          width: 100%; 
        }
      }
    }
    .view__contribution {
      font-weight: $font-lt;
      font-size: 15px;
    }

    .view__summary {
      max-width: 700px;
      font-family: $ptd !important;
      line-height: 1.4;
      flex: 1 1 auto;
      padding-top: 8px;

      @include responsive-1280 {
        max-width: 60%;
      }
      @include responsive-custom(1024) {
        max-width: unset;
        width: 100%;
      }
    }

    .view__tools-list {
      @include flex(false, row, wrap, flex-end, flex-start);

      height: 50px;
      gap: 8px;

      @include responsive-custom(1024) {
        height: unset;
      }
      @include responsive-mobile {
        justify-content: flex-start;
      }
      
      .tool__item {
        font-size: 14px;
        font-weight: $font-lt;
        color: $text-gray;
      }
    }

    .view__actions {
      @include flex(false, row, nowrap, flex-end, flex-end);

      gap: 12px;
      justify-self: flex-end;
      margin-top: auto;

      @include responsive-mobile {
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .common-button {
        @include responsive-tablet {
          width: unset;
          height: 40px;
          padding: 0 16px;
        }

        .icon {
          @include responsive-tablet {
            display: none;
          }
        }

        &.visit-page-button {
          
          @include responsive-mobile {
            width: 200px;
          }
        }
      }

      .button__text--mobile {
        display: none;

        @include responsive-tablet {
          display: block;
        }
      }
    }
  }
  .project-list-wrapper {
    margin-top: 72px;
  }
  // *********** category radios *********** //
  .project__category-wrapper {
    @include flex(false, row, nowrap, space-between, center);

    width: 100%;
    margin-bottom: 24px;

    @include responsive-tablet {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .category__title {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 8px;
      font-size: 18px;

      @include responsive-tablet {
        margin-bottom: 12px;
      }

      .icon {
        @include icon-custom(18);
      }
    }
  }
  .project__category {
    @include flex(false, row, nowrap, flex-end, center);
    
    gap: 4px;
    transform: translate(6px, 0);

    @include responsive-tablet {
      transform: translate(-6px, 0);
    }
    @include responsive-custom(540) {
      flex-wrap: wrap;
      gap: unset;
      width: 100%;
    }
    @include responsive-mobile {
      transform: unset;
      gap: 4px;
    }

    .category__item {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 6px;
      padding: 4px 6px;

      @include responsive-custom(540) {
        flex-wrap: wrap;
        width: 50%;
      }
      @include responsive-mobile {
        width: calc(50% - (4px * 1 / 2));
        padding: 0;
      }
    }
    .category__radio {
      appearance: radio;
      width: 15px;
      height: 15px;
      accent-color: $deep-blue;
    }
  }
  // *********** project list *********** //
  .project-list {
    @include flex(false, row, wrap, flex-start, center);

    align-content: flex-start;
    gap: 16px;
  }
  .project__item {
    @include flex(false, column, nowrap, flex-start, flex-start);
    @include card;

    gap: 6px;
    width: calc(20% - (16px * 4 / 5));
    height: 140px;
    border: 1px solid white;
    transition: all .3s ease;
    position: relative;
    cursor: pointer;

    @include responsive-custom(1024) {
      width: calc(25% - (16px * 3 / 4));
    }
    @include responsive-tablet {
      width: calc(50% - (16px * 1 / 2));
    }
    @include responsive-custom(540) {
      width: 100%;
    }

    &.project--active,
    &:hover {
      border-color: $deep-blue;
      
      .project__icons {

        .icon { display: none; }
        .deep-blue { display: block !important; }
      }
      .project__title {
        color: $deep-blue;
      }
      .project__tag-list {
        color: $pale-blue;
      }
    }

    .project__icons {

      .deep-blue { display: none; }

      .folder {
        @include icon-custom(20);
      }
    }
    .router-icon {
      position: absolute;
      bottom: 16px;
      right: 18px;

      .icon {
        transform: rotate(45deg);
      }
    }

    .project__tag-list {
      @include flex(false, row, nowrap, flex-start, center);

      gap: 6px;
      justify-self: flex-end;
      margin-top: auto;
      font-size: 14px;
      font-weight: $font-lt;
      color: $text-gray;
    }
  }
</style>