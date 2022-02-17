import Stack from '../sdk-plugin/index';

export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  });
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'footer',
    jsonRtePath: ['copyright'],
  });
  return response[0][0];
};

export const getHomeRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
    ],
  });
  return response[0];
};

export const getAboutRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    jsonRtePath: ['page_components.section_with_buckets.buckets.description'],
  });
  return response[0];
};

export const getSlugRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    jsonRtePath: [
      'page_components.section_with_buckets.buckets.description',
      'page_components.form.form_reference.uid',
    ],
  });
  return response[0];
};

export const getContactRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: ['page_components.section_with_html_code.description'],
  });
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  });
  return response[0];
};

export const getBlogBannerRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
  });
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  });
  return response[0];
};

export const getFormQuery = async (formId) => {
  const query = `
  query MyQuery {
    form(uid: "${formId}") {
      title
      description
      submit_button_text
      fields {
        ... on FormFieldsField {
          __typename
          field {
            referenceConnection {
              edges {
                node {
                  ... on TextboxField {
                    title
                    placeholder
                    system {
                      content_type_uid
                    }
                  }
                  ... on CheckboxField {
                    title
                    label
                    system {
                      content_type_uid
                    }
                  }
                  ... on FieldType {
                    title
                    placeholder
                    system {
                      content_type_uid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await Stack.callContentstack(query, {});
  const pageContent = response.data
    ? response.data
    : [];

  return pageContent;
};
