<template>
  <section class="component resume-cards">
    <!-- 프로필 -->
    <article class="card card-profile">
      <div class="profile">
        <div class="profile__avatar">
          <img src="@/assets/images/profile-image.jpg" alt="프로필 이미지" class="profile-image">
        </div>
        <p class="profile__name">{{profile.name}}</p>
        <p class="profile__message">{{profile.message}}</p>
      </div>
      <ul class="profile__info">
        <li 
          v-for="info, key in profile.info_list"
          :key="`profile-info-${key}`"
          class="info__item"
          :class="info.name"
        >
          <i class="icon info__icon" :class="info.icon"><span class="sr-only">{{info.title}}</span></i>
          <p class="info__value">{{info.value}}</p>
        </li>
      </ul>
      <ul class="card card-info-links">
        <li 
          v-for="info in info_links"
          :key="info.name"
          class="info__item"
        >
          <a :href="info.path" class="info__router" target="_blank">
            <i class="icon" :class="info.icon"></i>
            <span class="info__title">{{info.title}}</span>
          </a>
        </li>
      </ul>
    </article>
    <!-- 자격증 | 공부 -->
    <article class="card card-certification">
      <div class="card__title">
        <h3 class="title__text">자격증 및 교육</h3>
        <a :href="certification.link" class="title__action common-button button--fab button--escape" target="_blank">
          <i class="icon list deep-blue"><span class="sr-only">목록보기</span></i>
        </a>
      </div>

      <div class="card__contents">
        <ul class="certification-list">
          <li 
            v-for="certi, index in certification.data"
            :key="`certification-${index}`"
            class="certification__item"
          >
            <p class="certi__title">
              <i class="icon certi__icon" :class="certi.type" aria-hidden="true"></i>
              <span class="title__text">{{certi.name}}</span>
            </p>
            <span class="certi__date">{{certi.date}}</span>
          </li>
        </ul>
      </div>

    </article>
    <!-- 기술 스택 -->
    <article class="card card-tools">
      <div class="card__title">
        <h3 class="title__text">기술 스택</h3>
        <a :href="tools.link" class="title__action common-button button--fab button--escape" target="_blank">
          <i class="icon list deep-blue"><span class="sr-only">목록보기</span></i>
        </a>
      </div>
      <div class="card__contents">
        <ul class="tools-list">
          <li 
            v-for="tool in tools.data"
            :key="tool.name"
            class="tool__item"
          >
            <h4 class="tools__title">
              <i class="icon" :class="tool.icon" aria-hidden="true"></i>
              <span class="title__text">{{tool.name}}</span>
            </h4>
            <span class="tools__content">{{tool.content}}</span>
          </li>
        </ul>
      </div>
    </article>
    <!-- 자기소개 -->
    <article class="card card-self-introduce">
      <div class="card__title">
        <h3 class="title__text">안녕하세요, 저는요!</h3>
        <i class="icon purplenaive deep-blue" aria-hidden="true"></i>
      </div>
      <div class="card__contents">
        <ul class="character-list">
          <li 
            v-for="char, index in character.list"
            :key="`character-${index}`"
            class="character__item"
          >{{char}}</li>
        </ul>
        <p class="brief-introduce">
          <strong>”나와 같은 고민을 한 사람이 분명히 있을 거야", “더 간편한 방법이 있을 거야", “해결 방법이 있을 거야"</strong>
          문제를 해결하기 위한 저의 기본 자세입니다.
          쉽게 포기하지 않고 다른 분들의 경험과 기본 지식을 통해서 해결하기 위해 노력합니다.
        </p>
        <ul class="charater__tags common-tag-list">
          <li 
            v-for="tag, index in character.tags"
            :key="`character-tag-${index}`"
            class="tag__item"
          >{{tag}}</li>
        </ul>
      </div>
    </article>
    <!-- 경력사항 -->
    <article class="card card-career">
      <div class="card__title">
        <h3 class="title__text">경력사항</h3>
        <a :href="career.link" class="title__action common-button button--fab button--escape" target="_blank">
          <i class="icon list deep-blue"><span class="sr-only">목록보기</span></i>
        </a>
      </div>

      <div class="card__contents">
        <section class="career-list">
          <article 
            v-for="career, index in  career.data"
            :key="`career-${index}`"
            class="career__item"
          >
            <div class="career__title">
              <h4 class="title__text">{{career.name}}</h4>
              <a
                :href="career.link"
                class="career-detail-button common-button button--fab button--outlined--black button--escape"
                :class="{'button--disabled': !career.link,}"
                target="_blank"
              >
                <i class="icon chevron-right"><span class="sr-only">경력사항 자세히 보기</span></i>
              </a>
            </div>
            <div class="career__info">
              <div class="info__date">
                {{career.date.start}} ~ {{career.date.end ? career.date.end : "재직 중"}}
                <span class="date__period">({{career.date.period}})</span>
              </div>
              <span class="info__position">{{career.job}}({{career.position}})</span>
            </div>
            <ul class="career__activity">
              <li 
                v-for="activity, activity_index in career.do_list"
                :key="`career-activity-${index}-${activity_index}`"
                class="activity__item"
              >{{activity}}</li>
            </ul>
          </article>
        </section>
      </div>
    </article>
    
  </section>
</template>

<script>
  export default {
    name: "resumeCards",
    data() {
      return {
        profile: {
          name: "이은희",
          message: "멈추지 않고 성장 중",
          info_list: [
            { name: "birthday", title: "생년월일", icon: "birthday", value: "00.01.20"},
            { name: "location", title: "거주지", icon: "location", value: "김포시"},
            { name: "career", title: "경력", icon: "paper", value: "경력 3년"},
          ],
        },
        info_links: [
          { title: "연락처", name: "call", icon: "call", path: "tel:01084353663" },
          { title: "이메일", name: "email", icon: "mail", path: "mailto:purplenaive@gmail.com" },
          { title: "블로그", name: "blog", icon: "note", path: "https://purplenaive.notion.site/d1619275de714a158cc8d90bef99ddb4?v=83e98783aabf4d8bb7a2e36cef5a7829" },
          { title: "이력서", name: "resume", icon: "paper", path: "https://purplenaive.notion.site/833eb81908cc490ea33a5596d5c0de42" },
        ],
        certification: {
          link: "https://purplenaive.notion.site/purplenaive/833eb81908cc490ea33a5596d5c0de42#8e5390f9a42e495ea2a6888cbcaf9178",
          data: [
            {type: "card", name: "웹디자인기능사", date: "18.07.23"},
            {type: "card", name: "웹&앱 디자인 교육", date: "2018"},
          ]
        },
        tools: {
          link: "https://purplenaive.notion.site/purplenaive/833eb81908cc490ea33a5596d5c0de42#26f28e7312d7461bb0785b4e8dcd2ae7",
          data: [
            {
              name: "HTML",
              icon: "html",
              content: "능숙하게 사용 가능합니다. 의미론적인 구조, SEO, 웹표준과 웹포환성을 고려하여 작성합니다.",
            },
            {
              name: "CSS",
              icon: "css",
              content: "반응형, flex, grid를 포함하여 능숙한 사용이 가능합니다.",
            },
            {
              name: "SCSS",
              icon: "scss",
              content: "메인 프로젝트에 사용한 경험이 있으며, CSS보다 사용을 더 선합니다. 제공하는 함수들을 활용한 효율적인 코드 작성이 가능합니다.",
            },
            {
              name: "JAVASCRIPT",
              icon: "javascript",
              content: "jQuery보다 사용할 때 더 익숙하며 능숙합니다. 기본적인 기능 구현와 프레임워크, 라이브러리 사용 및 axios를 이용한 api 사용도 가능합니다",
            },
            {
              name: "Vue",
              icon: "vue",
              content: "메인 프로젝트로 사용한 경험이 있으며 능숙하게 사용 가능합니다.",
            },
          ],
        },
        character: {
          list: [
            "성실하고 우직하게 일에 임합니다",
            "작은 호기심을 가지고 끊임없이 공부합니다",
          ],
          tags: [
            "JS로 능숙한 기능 구현",
            "익숙한 Vue",
            "능숙한 SCSS",
            "시맨틱 마크업",
            "Flex, Grid 사용",
          ]
        },
        career: {
          link: "https://purplenaive.notion.site/purplenaive/833eb81908cc490ea33a5596d5c0de42#bdd7cd0ebefb4edb8a166c80c48d2dae",
          data: [
            {
              name: "연합시스템",
              link: "https://purplenaive.notion.site/441a86149fa745cda555928a191619c9",
              date: {
                start: "20.10",
                end: "",
                period: "23개월 ~"
              },
              position: "주임",
              job: "퍼블리셔",
              do_list: [
                "홈페이지 유지보수(wordpress)",
                "모든 스마트팩토리 서비스 퍼블리싱(vue)",
                "서비스 홍보페이지 퍼블리싱(vue)",
              ]
            },
            {
              name: "플로언스",
              link: "https://purplenaive.notion.site/ec0d576bea454afd864c976688bc8add",
              date: {
                start: "19.03",
                end: "20.02",
                period: "11개월"
              },
              position: "사원",
              job: "퍼블리셔",
              do_list: [
                "공사플랫폼 어플리케이션 퍼블리싱",
                "홈페이지 유지보수",
              ]
            },
            {
              name: "진담",
              link: "",
              date: {
                start: "18.12",
                end: "19.01",
                period: "3개월"
              },
              position: "사원",
              job: "퍼블리셔",
              do_list: [
                "카페24를 이용한 쇼핑몰 퍼블리싱",
              ]
            },
          ]
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .resume-cards {
    @include section-1200(false);
    @include flex(false, column, wrap, stretch, flex-end);

    align-content: flex-end;
    height: 970px;
    gap: 24px;
    margin-bottom: 24px;

    @include responsive-custom(950) {
      height: auto;
      max-height: 1400px;
    }
    @include responsive-tablet {
      flex-wrap: nowrap;
      max-height: unset;
    }

    .card:not(.icon) {
      @include card;

      @include responsive-tablet {
        width: 100%;
      }
    }
  }

  // ********** PROFILE CARD ********** //
  .card-profile {
    width: 300px;
    position: relative;
    overflow: visible !important;
    
    @include responsive-custom(950) {
      width: calc(45% - (24px / 2));
      margin-bottom: (91px + 24px);
    }

    .profile {
      text-align: center;
      margin-bottom: 16px;

      .profile__avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin: 0 auto 16px;
        overflow: hidden;
        background-color: $skyblue;
      }
      .profile-image {
        display: block;
        width: 100%;
        height: auto;  
      }

      .profile__name {
        margin-bottom: 8px;
        font-weight: $font-b;
      }
      .profile__message {
        font-weight: $font-md;
        color: $text-gray;
      }
    }

    .profile__info {
      @include flex(false, row, nowrap, center, center);

      border-radius: 24px;
      padding: 16px 0;
      background-color: $pale;

      .info__item {
        width: 70px;
        text-align: center;
      }
      .info__icon {
        margin: 0 auto 4px;
      }
      .info__value {
        font-size: 15px;
      }
    }
  }
  // ********** INFO LINKS CARD ********** //
  .card-info-links {
    @include flex(false, column, nowrap, center, center);

    gap: 12px;
    width: 115px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -24px;
    transform: translate(-100%, 0);

    @include responsive-custom(950) {
      width: 100%;
      height: auto;
      flex-direction: row;
      bottom: -24px;
      top: auto;
      left: 0;
      transform: translate(0, 100%);
    }

    .info__item {
      width: 100%;

      .info__router {
        @include flex(false, column, nowrap, center, center);

        width: 100%;
        gap: 3px;
      }
      .info__title {
        font-size: 14px;
      }
    }
  }
  // ********** CERTIFICATION CARD ********** //
  .card-certification {
    width: 440px;

    @include responsive-custom(950) {
      width: calc(45% - (24px / 2));
    }

    .certification-list {

      .certification__item {
        @include flex(false, row, nowrap, space-between, center);

        height: 32px;

        .certi__title {
          @include flex(true, row, nowrap, flex-start, center);

          gap: 4px;
        }
        .title__text {
          font-size: 16px;
        }
        .certi__date {
          font-size: 16px;
          color: $text-gray;
        }
      }
    }
  }
  // ********** TOOLS CARD ********** //
  .card-tools {
    flex: 1 1 auto;
    width: 440px;

    @include responsive-custom(950) {
      flex: 0 0 auto;
      width: calc(45% - (24px / 2));
    }
  }
  .tools-list {
    @include flex(false, column, nowrap, flex-start, center);

    gap: 16px;
    width: 100%;
    
    .tool__item {
      @include flex(false, row, nowrap, space-between, flex-start);

      width: 100%;

      @include responsive-custom(950) {
        flex-direction: column;
        gap: 8px;
      }

      .tools__title {
        @include flex(true, row, nowrap, flex-start, center);

        gap: 6px;
      }
      .title__text {
        font-weight: $font-md;
        font-size: 16px;

      }
      .tools__content {
        width: 240px;
        font-size: 15px;
        font-weight: $font-lt;
        line-height: 1.4;

        @include responsive-custom(950) {
          width: 100%;
        }
      }
    }
  }
  // ********** SELF INTRODUCE CARD ********** //
  .card-self-introduce {
    width: 420px;

    @include responsive-custom(950) {
      width: calc(55% - (24px / 2));
    }

    .card__title {

      .icon {
        @include icon-custom(28);
      }
    }

    .card__contents {
      @include flex(false, column, nowrap, flex-start, center);

      width: 100%;
      gap: 16px;
    }

    .character-list {
      width: 100%;

      .character__item {
        list-style: disc;
        list-style-position: inside;
        font-size: 16px;
        font-weight: $font-md;
      }
    }

    .brief-introduce {
      font-weight: $font-lt;
      color: $text-gray;
      line-height: 1.3;

      strong {
        font-weight: $font-md;
      }
    }
  }
  // ********** CAREER CARD ********** //
  .card-career {
    width: 420px;
    flex: 1 1 auto;

    @include responsive-custom(950) {
      flex: 0 0 auto;
      width: calc(55% - (24px / 2));
    }
  }
  .career-list {
    width: 100%;
    
    .career__item {
      padding: 20px 0;
      border-bottom: 1px solid $border-gray;

      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    .career__title {
      @include flex(false, row, nowrap, space-between, center);

      font-size: 16px;
      font-weight: $font-b;

    }
    .career-detail-button {

      .icon {
        @include icon-custom(32);
      }
    }

    .career__info {
      @include flex(false, row, nowrap, flex-start, center);

      font-size: 16px;
      font-weight: $font-md;
      color: $text-gray;
      margin-bottom: 24px;

      @include responsive-mobile {
        flex-direction: column;
        align-items: flex-start;
      }

      .info__date {
        width: 170px;
        margin-right: 12px;
        position: relative;

        &::after {
          content: "";
          display: block;
          width: 2px;
          height: 16px;
          background-color: $text-gray;
          position: absolute;
          right: 0;
          top: 2px;

          @include responsive-mobile {
            display: none;
          }
        }
      }
      .date__period {
        display: inline-block;
        font-size: 12px;
        font-weight: $font-lt;
        transform: translate(0, -1px);
      }
    }

    .career__activity {
      
      .activity__item {
        font-weight: $font-lt;
        line-height: 1.5;
        color: $text-gray;
        list-style: disc;
        list-style-position: inside;
      }
    }
  }
</style>