<template>
  <main class="main page note-page">
    <section class="notes-wrapper">
      <div class="notes__title">
        <i class="icon avatar" aria-hidden="true"></i>
        <p class="title__text">
          항상 이해를 중요시하며,<br>
          기록해가고 있습니다
        </p>
      </div>
      <section class="note-list">
        <skeleton-ui v-if="loading" column="6" height="180" responsive="skeleton--responsive-note"></skeleton-ui>
        <!-- 노트 하나 시작 -->
        <article
          v-show="!loading" 
          v-for="note in note.data"
          :key="note.id"
          class="note__item"
        >
          <a :href="note.url" target="_blank" class="inner">
            <p class="note-paper note__title">
              <i class="icon note" aria-hidden="true"></i>
              <span class="title__text">{{note.title}}</span>
            </p>
            <div class="note-paper note__summary">
              <span class="summary__text">{{note.summary}}</span>
              <p class="note__status" v-if="note.status.toLowerCase() !== 'done'">
                <span v-if="note.status =='in progress'" class="status--in-progress">작성 중</span>
                <span v-if="note.status =='Not started'" class="status--not-started">작성 예정</span>
                <i class="icon pencil gray" aria-hidden="true"></i>
              </p>
            </div>
            <i class="icon arrow-right deep-blue view-more-icon" aria-hidden="true"></i>
          </a>
        </article>
        <a 
          v-show="!loading"
          href="https://purplenaive.notion.site/d1619275de714a158cc8d90bef99ddb4?v=83e98783aabf4d8bb7a2e36cef5a7829" 
          target="_blank" 
          class="note__item note-view-all-button common-button button--outlined"
        >
          글 전체 보러가기
          <i class="icon arrow-right view-more-icon deep-blue" aria-hidden="true"></i>
        </a>
      </section>
    </section>
    <loading-spinner :active="loading"></loading-spinner>
  </main>
</template>

<script>
  import loadingSpinner from "@/components/loadingSpinner.vue";
  import skeletonUi from "@/components/skeletonUI.vue";

  export default {
    name: "noteCards",
    components: {
      loadingSpinner, skeletonUi,
    },
    data() {
      return {
        note: {
          data: [],
        },
        loading: true,
      };
    },
    methods: {
      getNotes() {
        this.$axios.get("/note/api/note")
          .then(response => {
            this.loading = true;
            this.trimNotes(response.data)
          })
          .catch(error => {
            console.log("get noets error: ", error);
          })
      },
      trimNotes(data) {
        const result = data.map(val => {
          const properties = val.properties;
          const summary = properties["개요"].rich_text.length ? properties["개요"].rich_text[0].plain_text : "";

          return {
            id: val.id,
            url: val.url.replace("www.notion.so", "purplenaive.notion.site"),
            title: properties["제목"].title[0].plain_text,
            summary,
            status: properties["작성"].status ? properties["작성"].status.name : "done",
          }
        })
        this.note.data = result;
        this.loading = false;
      }
    },
    mounted() {
      this.getNotes();
    },
  }
</script>

<style lang="scss" scoped>
  $note-width: 180px;
  $note-gap: 16px;

  // note section title 
  .notes__title {
    @include section-1200;

    margin-bottom: 48px;

    .avatar {
      @include icon-custom(100);

      margin: 0 auto;
    }
    .title__text {
      font-size: 18px;
      text-align: center;
      margin-top: 12px;
      color: $deep-blue;
    }
  }
  // note list
  .note-list {
    @include flex(false, row, wrap, flex-start, center);

    align-content: flex-start;
    gap: $note-gap;
    margin: 0 auto;
    width: calc(($note-width * 6) + ($note-gap * 5));
    
    @include responsive-1280 {
      width: calc(($note-width * 5) + ($note-gap * 4));
    }
    @include responsive-custom(1024) {
      width: calc(($note-width * 3) + ($note-gap * 2));
    }
    @include responsive-tablet {
      width: calc(100% - 48px);
    }
  }
  // note item
  .note__item {
    @include card;

    width: $note-width;
    height: $note-width;
    border: 1px solid white;
    transition: all 0.3s ease;
    position: relative;

    @include responsive-tablet {
      width: calc(33.33% - (16px * 2 / 3));
    }
    @include responsive-custom(640) {
      width: calc(50% - (16px * 1 / 2));
    }
    @include responsive-custom(480) {
      width: 100%;
    }

    .inner {
      display: block;
      width: 100%;
      height: 100%;  
    }

    &:hover {
      border-color: $deep-blue;

      .note__summary {
        display: flex;
      }
      .view-more-icon {
        display: inline-block;
      }
    }

    .note-paper {
      @include flex(false, column, nowrap, center, center);

      gap: 12px;
      width: 100%;
      height: 100%;
    }

    .note__title {
      text-align: center;
    }

    .note__summary {
      align-items: flex-start;
      display: none;
      width: 100%;
      height: 100%;
      padding: 16px;
      color: $deep-blue;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate((-50%, -50%));
      background-color: white;

      .summary__text {
        font-size: 15px;
        color: $text-gray;
      }

      .note__status {
        @include flex(false, row, nowrap, flex-end);

        gap: 2px;
        font-size: 14px;
        color: $text-gray;
        padding-bottom: 2px;
        border-bottom: 1px solid $text-gray;

        .icon {
          @include icon-custom(14);

          transform: translate(2px, 0);
        }
      }
    }

    .view-more-icon {
      display: none;
      position: absolute;
      right: 16px;
      bottom: 16px;
      transform: rotate(45deg);
      z-index: 1;
    }
  }
  // see note list
  .note-view-all-button {
    width: 180px;
    height: 180px;
    border-color: $deep-blue;

    @include responsive-tablet {
      width: calc(33.33% - (16px * 2 / 3));
    }
    @include responsive-custom(640) {
      width: calc(50% - (16px * 1 / 2));
    }
    @include responsive-custom(480) {
      width: 100%;
    }

    .view-more-icon {
      display: inline-block;
    }
  }

</style>