import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import { useState } from 'react'
import { IPost } from '@/interfaces/post/IPost'
import { printLog } from '@/utils/LogUtil'
import { BasicButton } from '@/components/ui/button/BasicButton'
import { postService } from '@/services/PostService'
import { useMutation } from 'react-query'

export default function ApiExample() {
  const router = useRouter()
  const [posts, setPosts] = useState<IPost[]>([])

  const { mutate: generatePostMutate, isLoading: isGptDataLoading, error: gptDataFetchError, data: gptResult } = useMutation(postService.generatePost)

  const onGoToHomeButtonClicked = () => {
    router.back()
  }

  const onApiTest1ButtonClicked = async () => {
    const posts = await postService.getPosts()
    printLog(JSON.stringify(posts))
    setPosts(posts)
  }

  const onApiTest2ButtonClicked = async () => {
    const posts = await postService.getPost(2)
    printLog(JSON.stringify(posts))
    setPosts([posts])
  }

  const onGeneratePostButtonClicked = async () => {
    const gptResult = await postService.generatePost({
      keywords: 'travel, adventure',
      description: 'Exploring the hidden gems of the city, uncovering new adventures at every turn.',
    })
    alert(gptResult)
  }

  const generatePostWithReactQuery = async () => {
    generatePostMutate({
      keywords: 'travel, adventure',
      description: 'Exploring the hidden gems of the city, uncovering new adventures at every turn.',
    })
  }

  const onClearDataButtonClicked = async () => {
    setPosts([])
  }

  return (
    <Layout>
      <div className={'flex flex-col justify-start items-center rounded-[20px] bg-white w-full max-w-[512px] h-full overflow-y-scroll'}>
        <BasicButton onClick={onGoToHomeButtonClicked}>홈으로 가기</BasicButton>
        <BasicButton onClick={onApiTest2ButtonClicked}>게시물 하나 가져오기</BasicButton>
        <BasicButton onClick={onApiTest1ButtonClicked}>게시물 여러개 가져오기</BasicButton>
        <BasicButton onClick={onGeneratePostButtonClicked}>GPT생성요청</BasicButton>
        <BasicButton onClick={generatePostWithReactQuery}>GPT생성요청(React Query)</BasicButton>
        <BasicButton onClick={onClearDataButtonClicked}>게시물 초기화</BasicButton>

        <div className={'flex flex-col gap-8'}>
          {posts &&
            posts.map((post) => {
              return (
                <div key={post.id} className={'flex flex-col'}>
                  <span>{`- 제목 : ${post.title}}`}</span>
                  <span>{`- 내용 : ${post.body}`}</span>
                </div>
              )
            })}
        </div>

        {isGptDataLoading && <span>GPT 데이터 로딩중</span>}
        {gptResult && <span>{gptResult}</span>}
      </div>
    </Layout>
  )
}
