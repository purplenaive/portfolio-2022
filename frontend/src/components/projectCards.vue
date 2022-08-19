<template>
  <section class="component project-cards">
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
      <article class="content__view">
        {{project.active.data}}
      </article>
      <section id="contents-wrap" class="contents-wrap">
        <article 
          v-for="project, index in project.data"
          :key="project.id"
          v-show="projectFilter(project.category)"
          class="project__item"
          :class="[`project-${project.category}`, {'project--active': index == 0,}]"
          @click="(event) => selectProject(event, project)"
          :data-project-index="index"
        >
          <div class="project__icon">
            <i class="icon folder default"></i>
            <i class="icon folder deep-blue"></i>
          </div>
          <p class="project__title">{{project.title}}</p>
          <ul class="project__tags">
            <li 
              v-for="tag, tag_index in project.tags"
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
            category: "all",
            data: {},
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
        const result = data.map(value => {
          const properties = value.properties;
          const date = properties["작업 날짜"].date;
          const tags = properties["태그"].multi_select.map(item => item.name);
          const tools = properties["사용 툴"].multi_select.map(item => item.name);
          const category = properties.category.select;
          
          return {
            id: value.id,
            url: value.url,
            title: properties.title.rich_text[0].plain_text,
            name: properties.name.rich_text[0].plain_text,
            category: category ? category.name : "",
            date: {
              start: date.start,
              end: date.end,
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
        })
        console.log(result);
        this.project.data = result;
      },
      selecteCategory(category) { // 프로젝트 보여질 카테고리 변경
        const project = this.project;
        const contents_wrap = document.getElementById("contents-wrap");
        const active_class = "project--active";
        const active_item = contents_wrap.querySelector(`.${active_class}`);
        const active_target = category == "all" ? 
                              contents_wrap.querySelector(".project__item") :
                              contents_wrap.querySelectorAll(`.project-${category}`)[0];
        const active_index = category == "all" ? 0 : active_target.dataset.projectIndex;

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
    @include section-1200(false);

    margin-bottom: 500px;
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

  .project__contents {
    @include flex(false, row, nowrap, flex-start, flex-start);
    @include card;

    gap: 24px;
    border-top-left-radius: 0;

    .content__view {
      @include card;

      flex: 1 1 auto;
      min-height: 450px;
      background-color: rgba($deep-blue, 0.08);
    }

    .contents-wrap {
      @include flex(false, row, wrap, flex-start, center);

      $calculated-width: calc((150px * 4) + (24px * 3));
      min-width: $calculated-width;
      width: $calculated-width;
      align-content: flex-start;
      gap: 24px;
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

      .project__icon {
        
        .icon {
          @include icon-custom(16);

        }
        .deep-blue { display: none; }
      }
      .project__title {
        font-size: 16px;
        font-weight: $font-md;
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
    .arrow-right {
      position: absolute;
      bottom: 20px;
      right: 20px;
      transform: rotate(45deg);

      &.deep-blue { display: none; }
    }
  }

</style>