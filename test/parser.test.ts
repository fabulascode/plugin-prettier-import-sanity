// import { parser } from '../src/parser';
import prettier, { CustomParser } from 'prettier';

const code: string = `
import React, { useState, useEffect } from 'react';

import * as ReactNative from 'react-native';
import { foo as Bar } from 'foo-bar';


import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ProfileNav from '../../features/profile.navigation/';
import { useUser } from '../../../../store/user-context';
import styled from 'styled-components';
import classNames from 'classnames';


import ProfileAffiliations from '../../features/profile.affiliations';
import ProfileCompanies from '../../features/profile.companies';

import CreateCompanyScreen from '../company/index';`;

it('works at least a little', () => {
  console.log('\n*** BEFORE *** \n', code);
  prettier.format(code, {
    parser: ('insanity-parse' as unknown) as CustomParser,
    plugins: ['.'],
  });
});
