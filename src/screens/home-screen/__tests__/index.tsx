/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeScreen from '..';
import * as Navigation from '@react-navigation/native'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { INavigationService } from '../../../modules/hooks/navigation-service/types';

describe('Home-Screen', () => {

  let mockedNavigate = jest.fn();
  beforeEach(() => {
    mockedNavigate = jest.fn();
    jest.mock('@react-navigation/native', () => {
      const actualNav = jest.requireActual('@react-navigation/native');
      return {
        ...actualNav,
        useNavigation: () => ({
          navigate: mockedNavigate,
          replace: mockedNavigate,
          popToTop: mockedNavigate,
        }),
      };
    });

    // jest.mock('../../../modules/hooks/navigation-service', () => {
    //   return () => {
    //     return {
    //       navigateToHome: jest.fn(),
    //       navigateToLeadersBoard: jest.fn(),
    //       navigateToPuzzle: jest.fn(),
    //       navigateToResult: jest.fn(),
    //     } as INavigationService
    //   }
    // })

    // jest.spyOn(Navigation, 'useNavigation').mockImplementation(() => ({
    //   navigate: mockedNavigate,
    //   replace: mockedNavigate,
    //   popToTop: mockedNavigate,
    // }))

  });

  it('renders correctly', () => {

    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})

