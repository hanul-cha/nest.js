import { IsNotEmpty } from 'class-validator';

/* 
여러군데에서 묶여있는 property들을 수정할 때 하나하나 바꾸다보면
에러가 발생할수있다. 유지보수가 어려워지는것인데,
dto는 이런 문제를 해결해줄수있다.

dto는 interface, class로 작성할 수 있는데 
nestjs는 class로 작성하는걸 권장한다.
이유로는 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에
(프로그램이 시작하는중에)
파이프 같은 기능을 니용할 때 더 유용하다.
*/
export class createBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
