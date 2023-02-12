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
        navigate(screens.home);
    }
    const navigateToPuzzle = (gameData: IGameData) => {
        replace(screens.puzzle, { gameData });
    }
    const navigateToResult =  (gameData: IGameData) => {
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