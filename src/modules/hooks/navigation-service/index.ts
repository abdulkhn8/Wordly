import { useNavigation } from "@react-navigation/native";
import { Alert, Share } from "react-native";
import { screens, strings } from "../../constants";
import { IGameData } from "../../types";
import { stringFormat } from "../../utils";
import { INavigationService } from "./types";

function useNavigationService(): INavigationService {
    const navigation = useNavigation();
    const { shareScore } = strings

    const navigate = (routeName: string, params: any = {}) => {
        navigation.navigate(routeName, params);
    }
    const replace = (routeName: string, params: any = {}) => {
        navigation.replace(routeName, params);
    }
    const navigateToHome = () => {
        navigation.popToTop()
    }
    const navigateToPuzzle = (gameData: IGameData) => {
        const firstPuzzle = gameData.index == 0
        if (firstPuzzle)
            navigate(screens.puzzle, { gameData })
        else
            replace(screens.puzzle, { gameData });
    }
    const navigateToResult = (gameData: IGameData) => {
        navigate(screens.result, { gameData });
    }
    const navigateToLeadersBoard = () => {
        navigate(screens.leadersBoard);
    }
    const shareScoreWithOthers = async (score: number) =>{
        try {
            const result = await Share.share({ message: stringFormat(shareScore, score) });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    }

    return ({
        navigateToHome,
        navigateToPuzzle,
        navigateToResult,
        navigateToLeadersBoard,
        shareScoreWithOthers
    })
}

export default useNavigationService