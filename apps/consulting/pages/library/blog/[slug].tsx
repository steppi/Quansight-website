import { FC } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { usePreviewMode } from '@quansight/shared/storyblok-sdk';
import { ISlugParams, DomainVariant } from '@quansight/shared/types';
import { Layout, SEO, Footer, Header } from '@quansight/shared/ui-components';

import { getFooter } from '../../../api/utils/getFooter';
import { getHeader } from '../../../api/utils/getHeader';
import { getLibraryArticleItem } from '../../../api/utils/getLibraryArticleItem';
import { getLinks } from '../../../api/utils/getLinks';
import { TLibraryArticleProps } from '../../../types/storyblok/bloks/libraryArticleProps';
import { ARTICLES_DIRECTORY_SLUG } from '../../../utils/getArticlesPaths/constants';
import { getArticlesPaths } from '../../../utils/getArticlesPaths/getArticlesPaths';

const Article: FC<TLibraryArticleProps> = ({
  data,
  header,
  footer,
  preview,
}) => {
  usePreviewMode(preview);
  const { content } = data;

  return (
    <Layout
      footer={<Footer {...footer.content} />}
      header={
        <Header {...header.content} domainVariant={DomainVariant.Quansight} />
      }
    >
      <SEO
        title={content.title}
        description={content.description}
        variant={DomainVariant.Quansight}
      />
      {/* TODO: hero */}
      {/* TODO: go back link */}
      {/* TODO: meta data */}
      <h1>{content.postTitle}</h1>
      {/* TODO: article */}
      {/* TODO: read more */}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const links = await getLinks();
  return {
    paths: getArticlesPaths(links),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  TLibraryArticleProps,
  ISlugParams
> = async ({ params: { slug }, preview = false }) => {
  const data = await getLibraryArticleItem({
    slug: `${ARTICLES_DIRECTORY_SLUG}${slug}`,
  });
  const footer = await getFooter();
  const header = await getHeader();
  return {
    props: {
      data,
      header,
      footer,
      preview,
    },
  };
};

export default Article;
