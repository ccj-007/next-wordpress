import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

interface postDataProps {
  postData: {
    title: string
    id: string
    date: string
    contentHtml: string
  }
}

export default function Post({ postData }: postDataProps) {
  return (
    <Layout >
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* <Date dateString={postData.date} /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

interface staticProps {
  params: {
    id: string
  }
}

export async function getStaticProps({ params }: staticProps) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}