import { useNavigation } from "@react-navigation/native";
import { screens } from "../../constants";
import { IGameData } from "../../types";
import { INavigationService } from "./types";

function useNavigationService(): INavigationService {
    const navigation = useNavigation();

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

    return ({
        navigateToHome,
        navigateToPuzzle,
        navigateToResult,
        navigateToLeadersBoard
    })
}

export default useNavigationService