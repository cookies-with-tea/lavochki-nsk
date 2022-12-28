import {FC} from 'react';
import Image from "next/image";

import {
    StyledBenchCard,
    StyledBenchTitle,
    StyledBenchWrapper,
    StyledImageWrapper,
    StyledOpenlink,
    StyledRatingCount,
    StyledTag,
    StyledTags
} from "@/app/components/pages/Benches/Bench/BenchCard/BenchesCard.styles";
import CommonIcon from "@/app/components/Common/CommonIcon/CommonIcon";
import {IBench} from "@/app/interfaces/bench.interface";
import Link from "next/link";

const BenchCard: FC<{ bench: IBench }> = ({ bench }): JSX.Element => {
    return (
        <StyledBenchCard>
            <StyledImageWrapper>
                <Image src={bench.images[0]} alt="image" width="100%" height="100%" layout="responsive" objectFit="cover" />
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
                <div className={"d-f ai-c jc-sb"}>
                    <Link href={`/benches/${bench.id}`} passHref>
                        <StyledOpenlink>
                            Открыть
                        </StyledOpenlink>
                    </Link>
                    <div className={"d-f ai-c"}>
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