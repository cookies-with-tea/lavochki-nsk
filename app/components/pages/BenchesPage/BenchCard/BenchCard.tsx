import {FC} from 'react';
import Image from "next/image";

import {IProps} from "@/app/components/pages/BenchesPage/BenchCard/BenchesCard.interface";
import {
    StyledBenchCard,
    StyledBenchTitle,
    StyledBenchWrapper,
    StyledImageWrapper,
    StyledOpenButton,
    StyledRatingCount,
    StyledTag,
    StyledTags
} from "@/app/components/pages/BenchesPage/BenchCard/BenchesCard.styles";

import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";

const BenchCard: FC<IProps> = ({ bench }): JSX.Element => {
    return (
        <StyledBenchCard>
            <StyledImageWrapper>
                <Image src={bench.images[0]} alt="image" width="100%" height="100%" layout="responsive" objectFit="contain" />
            </StyledImageWrapper>
            <StyledBenchWrapper>
                <StyledBenchTitle>Лавочка на Каменской</StyledBenchTitle>
                <StyledTags>
                    {
                        bench.tags.map((item: any) => (
                            <StyledTag key={item.id}>
                                #{item.title}
                            </StyledTag>
                        ) )
                    }
                </StyledTags>
                <div className={"d-flex ai-center jc-between"}>
                    <StyledOpenButton>
                        Открыть
                    </StyledOpenButton>
                    <div className={"d-flex ai-center"}>
                        <CommonIcon name="star" width={16} height={16} />
                        <StyledRatingCount>
                            4.2
                        </StyledRatingCount>
                    </div>
                </div>
            </StyledBenchWrapper>
        </StyledBenchCard>
    );
};

export default BenchCard;