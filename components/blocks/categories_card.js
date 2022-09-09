import AvatarStyled from '../ui/avatar_styled'
import Container from '../wrappers/container'
import Wrapper from '../wrappers/wrapper'
import Title from '../ui/title'
import { DefaultButton } from '../ui/button'

export default function CategoriesCard({ data }) {
  return (
    <>
      <Wrapper maxWidth={360}>
        <AvatarStyled src={data.pic} width={100} height={100} />
        <Container>
          <Title>{data.main_name}</Title>
          <Container maxWidth={220} display={'flex'}>
            {data.serv_types.map((i) => (
              <DefaultButton key={i.id} value={i} />
            ))}
          </Container>
        </Container>
      </Wrapper>
    </>
  )
}
