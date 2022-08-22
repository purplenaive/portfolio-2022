<template>
  <section class="component project-cards">
    <img src="@/assets/image/project-typo.svg" alt="PROJECT" class="project-typo" aria-hidden="true">
    <div class="project__tabs">
      <button 
        v-for="tab in project.category"
        :key="`tab-${tab.id}`"
        class="tab__item common-button depressed"
        :class="{'active': tab.id == project.active.category}"
        @click="selecteCategory(tab.id)"
      >{{tab.name}}</button>
    </div>
    <section class="project__contents">
      <!-- 왼쪽 view -->
      <article class="project__view">
        <template v-if="project.active.active">
          <div class="view__titles">
            <i class="icon large folder-open"></i>
            <p class="view__title">{{project.active.data.title}}</p>
          </div>
          <ul class="view__info-list">
            <li class="info__item">
              <p class="info__title">
                <i class="icon code" aria-hidden="true"></i>
                프로젝트
              </p>
              <p class="info__value">{{project.active.data.name}}</p>
            </li>
            <li class="info__item">
              <p class="info__title">
                <i class="icon calendar" aria-hidden="true"></i>
                작업 기간
              </p>
              <p class="info__value">
                {{project.active.data.date.start}} ~ 
                {{project.active.data.date.end}}
                ({{project.active.data.date.period}})
              </p>
            </li>
            <li class="info__item summary">{{project.active.data.summary}}</li>
            <li class="info__item">
              <ul class="view__tool-list">
                <li 
                  v-for="tool, tool_index in project.active.data.tools"
                  :key="`tool-${tool_index}`"
                  class="tool__item"
                >#{{tool}}</li>
              </ul>
            </li>
          </ul>
          <div class="view__actions">
            <a
              :href="project.active.data.links.git"
              target="_blank"
              class="action__item common-button fab"
            >
              <i class="icon git small"><span class="sr-only">깃으로 이동하기</span></i>
            </a>
            <a 
              :href="project.active.data.url" 
              target="_blank"
              class="action__item common-button"
            >설명보기</a>
              <!-- :to="project.active.data.links.page"  -->
            <router-link 
              to="/"
              target="_blank"
              class="action__item common-button active"
            >페이지</router-link>
          </div>
        </template>
      </article>
      <section id="contents-wrap" class="projects-wrap">
        <h4 class="project__title">
          <i class="icon small attention" aria-hidden="true"></i>
          <span class="title__text" v-if="project.active.category == 'all'">제가 했던 모든 프로젝트입니다!</span>
          <span class="title__text" v-else-if="project.active.category == 'company'">재직 중 진행했던 프로젝트입니다.</span>
          <span class="title__text" v-else-if="project.active.category == 'side'">재직 중 개인적으로 진행했던 프로젝트입니다.</span>
          <span class="title__text" v-else-if="project.active.category == 'practice'">퍼블리셔가 되기 위해 진행했던 프로젝트입니다.</span>
        </h4>
        <!-- 프로젝트 하나 시작 -->
        <article 
          v-for="pj, index in project.data"
          :key="pj.id"
          v-show="projectFilter(pj.category)"
          class="project__item"
          :class="[`project-${pj.category}`, {'project--active': index == project.active.index,}]"
          @click="(event) => selectProject(event, pj)"
          :data-project-index="index"
        >
          <div class="project__icon">
            <i class="icon folder default"></i>
            <i class="icon folder deep-blue"></i>
          </div>
          <p class="project__title">{{pj.title}}</p>
          <ul class="project__tags">
            <li 
              v-for="tag, tag_index in pj.tags"
              :key="`tag-${tag_index}`"
              class="tag__item"
            >#{{tag}}</li>
          </ul>
          <i class="icon arrow-right default" aria-hidden="true"></i>
          <i class="icon arrow-right deep-blue" aria-hidden="true"></i>
        </article>
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    name: "projectCards",
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
        }
      }
    },
    methods: {
      getProjects() { // 프로젝트 가져오기
        this.$axios.get("/api/project")
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

          const object = {
            id: value.id,
            url: value.url,
            title: properties.title.rich_text[0].plain_text,
            name: properties.name.rich_text[0].plain_text,
            category,
            date: {
              start: date.start.replaceAll("-", ".").slice(2),
              end: date.end ? date.end.replaceAll("-", ".").slice(2) : "",
              period: properties["작업 기간"].rich_text[0].plain_text,
            },
            summary: properties["간단 설명"].rich_text[0].plain_text,
            links: {
              git: properties.Git.url,
              page: properties["페이지"].url,
            },
            contribution: properties["기여도"].number,
            tags,
            tools,
          }
          if( project.active.data.id == undefined && category == "company" ) {
            // 첫 로딩시에만 적영될 선택된 프로젝트 (active.index는 이후로 쓰이지 않음)
            project.active.data = object;
            project.active.index = index;
          }

          return object;
        })
        project.data = result;
        project.active.active = true;
      },
      selecteCategory(category) { // 프로젝트 보여질 카테고리 변경
        const project = this.project;
        const contents_wrap = document.getElementById("contents-wrap");
        const active_class = "project--active";
        const active_item = contents_wrap.querySelector(`.${active_class}`);
        // 활성화 시킬 project__item dom 가져오는 변수들
        const active_target = category == "all" ? 
                              contents_wrap.querySelector(".project__item") :
                              contents_wrap.querySelectorAll(`.project-${category}`)[0];
        const active_index = category == "all" ? 0 : active_target.dataset.projectIndex;

        project.active.index = -1; // active.index 이 이후로 사용 x
        active_item.classList.remove(active_class);
        project.active.category = category;
        active_target.classList.add(active_class);
        project.active.data = project.data[active_index];
      },
      projectFilter(category) { // 가져온 프로젝트 선택한 카테고리에 따라 보여주기
        const selected = this.project.active.category;
        
        if(selected == "all") return true;
        return selected == category;
      },
      selectProject(event, data) { // 선택한 프로젝트 자세히 보기
        const project = this.project;
        const active_class = "project--active";
        const contents_wrap = document.getElementById("contents-wrap");
        const active_item = contents_wrap.querySelector(`.${active_class}`);

        project.active.data = data;
        active_item.classList.remove(active_class);
        event.currentTarget.classList.add(active_class);
      }
    },
    mounted() {
      this.getProjects();
    },
  }
</script>

<style lang="scss" scoped>

  .project-cards {
    @include section-1200(false, false);

    margin-bottom: 200px;
    position: relative;

    .project-typo {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(25px, 0);
      z-index: -1;
    }
  }

  .project__tabs {

    .tab__item {
      border-radius: 16px 16px 0 0;
      position: relative;
      overflow: visible;
      transition: all 0.3s ease;

      &:hover,
      &.active {
        transition: all 0.3s ease;

        &::after,
        &::before {
          content: "";
          height: 23px;
          width: 28px;
          position: absolute;
          right: 0;
          bottom: 0;
          transform: translate(100%, 0);
          transition: all 0.3s ease;
        }
        &::after {
          border-bottom-left-radius: 16px;
          background-color: $pale;
        }
        &::before {
          background-color: $deep-blue;
        }

        & + .tab__item {
          border-bottom-left-radius: 16px;
        }
      }
      &:hover:not(.active) {
        background-color: $skyblue;

        &::before {
          background-color: $skyblue;
        }
      }
    }
  }

  // project__view, projecst-wrap in here
  .project__contents {
    @include flex(false, row, nowrap, flex-start, flex-start);
    @include card;

    gap: 24px;
    border-top-left-radius: 0;
  }

  .project__view {
    @include card;
    @include flex(false, column, nowrap, flex-start, flex-start);

    gap: 45px;
    flex: 1 1 auto;
    min-height: 450px;
    padding: 32px;
    background-color: rgba($deep-blue, 0.08);

    .view__title {
      margin-top: 16px;
      color: $deep-blue;
      font-size: 20px;
      font-weight: $font-b;
    }

    .info__item {
      @include flex(false, row, nowrap, flex-start, center);

      line-height: 2;

      &.summary {
        max-width: 90%;
        margin: 16px 0;
        line-height: 1.4;
      }

      .info__title {
        @include flex(false, row, nowrap, flex-start, center);
        
        gap: 6px;
        width: 120px;
      }
      .info__value {
        color: $text-gray;
      }
    }

    .view__tool-list {
      @include flex(flase, row, nowrap, flex-start, center);

      gap: 8px;

      .tool__item {
        font-size: 14px;
        font-weight: $font-lt;
        color: $text-gray;
      }
    }

    .view__actions {
      @include flex(false, row, nowrap, flex-end, center);

      justify-self: flex-end;
      margin-top: auto;
      width: 100%;
      gap: 12px;
      cursor: pointer;
    }
  }

  .projects-wrap {
    @include flex(false, row, wrap, flex-start, center);

    $calculated-width: calc((150px * 4) + (24px * 3));
    min-width: $calculated-width;
    width: $calculated-width;
    align-content: flex-start;
    gap: 24px;

    .project__title {
      @include flex(false, row, nowrap, flex-start, center);

      width: 100%;
      gap: 6px;

      .title__text {
        font-size: 18px;
        font-weight: $font-md;
      }
    }

    .project__item {
      @include flex(false, column, nowrap, flex-start, flex-start);
      @include card;

      gap: 6px;
      width: 150px;
      height: 150px;
      position: relative;
      border: 1px solid $pale;
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: $pale;

      &.project--active,
      &:hover {
        border-color: $deep-blue;
        transition: all 0.3s ease;

        .icon {
          &.deep-blue { display: inline-block; }
          &.default { display: none; }
        }

        .project__title {
          color: $deep-blue;
        }

        .tag__item {
          color: $deep-blue;
        }
      }

      .project__icon { // folder icon
        
        .icon {
          @include icon-custom(16);
        }
        .deep-blue { display: none; }
      }
      .project__title {
        font-size: 16px;
        font-weight: $font-md;
      }
      
      .arrow-right {
        position: absolute;
        bottom: 20px;
        right: 20px;
        transform: rotate(45deg);

        &.deep-blue { display: none; }
      }
    }
    .project__tags {
      @include flex(false, row, wrap, flex-start, center);

      gap: 4px;
      justify-self: flex-end;
      margin-top: auto;

      .tag__item {
        font-size: 14px;
        font-weight: $font-lt;
        color: $text-gray;

      }
    }
  }

</style>