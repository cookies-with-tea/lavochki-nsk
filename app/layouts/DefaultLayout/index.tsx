import {GetStaticProps, NextPage} from "next";
import {ReactElement, ReactNode, useContext, useEffect, useState} from "react";
import DefaultLayoutHeader from "@/app/components/Layouts/DefaultLayout/DefaultLayoutHeader";
import {StyledContainer} from "@/app/layouts/DefaultLayout/DefaultLayout.style"
import DefaultLayoutFooter from "@/app/components/Layouts/DefaultLayout/DefaultLayoutFooter";
import {useSnackbar} from "notistack";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {UserMeType} from "@/app/types/User";
import {ErrorType} from "@/app/types/common.type";
import UserService from "@/app/services/User/UserService";

interface IProps {
    children: ReactNode
}

const getMe = async (): Promise<UserMeType> => await UserService.getMe()

const DefaultLayout: NextPage<IProps> = ({ children }): ReactElement => {
    useQuery<UserMeType>('get user', getMe, {
        // onError: (error: ErrorType | unknown) => {
        //     const errorData = error as ErrorType
        //
        //     enqueueSnackbar(errorData.message,
        //         {
        //             variant: 'error',
        //             anchorOrigin: {
        //                 vertical: 'top',
        //                 horizontal: 'right'
        //             }
        //         }
        //     )
        // }
    })


    return (
        <>
            <DefaultLayoutHeader />
                <StyledContainer className="container">
                    { children }
                </StyledContainer>
            <DefaultLayoutFooter />

        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery<UserMeType>('get user', getMe)

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

export default DefaultLayout