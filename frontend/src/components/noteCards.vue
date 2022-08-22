<template>
  <section class="component note-cards">
    <h3 class="note-card__title">
      <i class="icon avatar xl" aria-hidden="true"></i>
      <img src="@/assets/image/note-typo.svg" alt="저는 결국 이해해야 되더라구요" class="title__typo" aria-hidden="true">
      <span class="title__text sr-only">개인 공부 노트 모음</span>
    </h3>
    <!-- 노트 하나 시작 -->
    <article 
      v-for="note in note.data"
      :key="note.id"
      class="note__item"
    >
      <a :href="note.url" target="_blank" class="inner">
        <p class="note-paper note__title">
          <i class="icon note"></i>
          <span class="title__text">{{note.title}}</span>
        </p>
        <div class="note-paper note__summary">
          <span class="summary__text">{{note.summary}}</span>
          <p class="note__status" v-if="note.status.toLowerCase() !== 'done'">
            <span v-if="note.status =='in progress'" class="status--in-progress">작성 중</span>
            <span v-if="note.status =='Not started'" class="status--not-started">작성 예정</span>
            <i class="icon pencil gray"></i>
          </p>
        </div>
        <i class="icon arrow-right deep-blue view-more-icon" aria-hidden="true"></i>
      </a>
    </article>
    <a 
      href="https://purplenaive.notion.site/d1619275de714a158cc8d90bef99ddb4?v=83e98783aabf4d8bb7a2e36cef5a7829" 
      target="_blank" 
      class="note__item note-view-all-button common-button outlined"
    >
      글 전체 보러가기
      <i class="icon arrow-right view-more-icon deep-blue" aria-hidden="true"></i>
    </a>
  </section>
</template>

<script>
  export default {
    name: "noteCards",
    data() {
      return {
        note: {
          data: [],
        }
      };
    },
    methods: {
      getNotes() {
        this.$axios.get("api/note")
          .then(response => {
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
            url: val.url,
            title: properties["제목"].title[0].plain_text,
            summary,
            status: properties["작성"].status ? properties["작성"].status.name : "done",
          }
        })
        this.note.data = result;
      }
    },
    mounted() {
      this.getNotes();
    },
  }
</script>

<style lang="scss" scoped>

  .note-cards {
    @include flex(false, row, wrap, flex-start, center);

    gap: 16px;
    width: calc((180px * 6) + (16px * 5));
    margin: 0 auto;

    .note-card__title {
      width: 376px;
      height: 180px;
      position: relative;

      .avatar {
        @include icon-custom(200);

        transform: translate(-50px, -10px);
      }
      .title__typo {
        position: absolute;
        left: 120px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }

    .note__item {
      @include card;

      width: 180px;
      height: 180px;
      border: 1px solid white;
      transition: all 0.3s ease;
      position: relative;

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
    .note-view-all-button {
      width: 180px;
      height: 180px;

      border-color: $deep-blue;

      .view-more-icon {
        display: inline-block;
      }
    }
  }

</style>