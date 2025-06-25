import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'sanity_react',

  projectId: 'ddqbxgsr',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .id('root')
          .title('콘텐츠')
          .items([
            S.listItem()
              .id('news')
              .title('뉴스')
              .child(
                S.list()
                  .id('news-languages')
                  .title('언어별 뉴스')
                  .items([
                    S.listItem()
                      .id('news_all')
                      .title('전체')
                      .child(
                        S.documentList()
                          .id('news_all_list')
                          .title('전체 뉴스')
                          .filter('_type == "news"')
                          .canHandleIntent((intentName, params) => {
                            return intentName === 'create' && params.type === 'news'
                          }),
                      ),
                    S.listItem()
                      .id('news_ko')
                      .title('한국어')
                      .child(
                        S.documentList()
                          .id('news_ko_list')
                          .title('한국어 뉴스')
                          .filter('_type == "news" && language == "ko"')
                          .initialValueTemplates([
                            S.initialValueTemplateItem('news-language', {language: 'ko'}),
                          ])
                          .canHandleIntent((intentName, params) => {
                            return intentName === 'create' && params.type === 'news'
                          }),
                      ),
                    S.listItem()
                      .id('news_en')
                      .title('English')
                      .child(
                        S.documentList()
                          .id('news_en_list')
                          .title('English 뉴스')
                          .filter('_type == "news" && language == "en"')
                          .initialValueTemplates([
                            S.initialValueTemplateItem('news-language', {language: 'en'}),
                          ])
                          .canHandleIntent((intentName, params) => {
                            return intentName === 'create' && params.type === 'news'
                          }),
                      ),
                  ]),
              ),
          ]),
    }),
    visionTool(),
    // documentInternationalization({
    //   supportedLanguages: [
    //     // {id: 'ko', title: '한국어'},
    //     // {id: 'en', title: 'English'},
    //   ],
    //   schemaTypes: ['news'],
    // }),
  ],

  schema: {
    types: schemaTypes,
  },
})
