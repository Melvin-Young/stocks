/* tslint:disable no-unused-expression jsx-no-lambda no-console */

import React, { Component } from 'react';
import ConfigurableButton from '../buttons/ConfigurableButton';
import { ICompany } from '../utils/Company';
import { ITeam } from '../utils/Team';

interface IProps {
  company: ICompany,
  team: ITeam,
  displayNewTeam: (team: ITeam) => void,
}

interface IState {
  showStaff: boolean,
  team: ITeam
}

class Card extends Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      showStaff: false,
      team: props.team
    }
  }

  public render() {
    const { displayNewTeam, team, company } = this.props;
    const childTeams = team.getChildren();
    const childTeamContainer: any[] = [];
    childTeams.size && childTeams.forEach((childTeam: ITeam) => {
      childTeamContainer.push(<li key={childTeam.name}> {childTeam.name} </li>)
    })

    return (
      <div className='card team-card'>
        <div onClick={ () => displayNewTeam(team) }>
          <img src={require('./../images/smalltable.jpg')} alt="Avatar" className="card-picture" />
          <h2> {team.name} Team</h2>
          <ul> {childTeamContainer} </ul>
        </div>
        <div className="team-button-container">
          { team.getParent() !== company.getRoot() && <ConfigurableButton onClickFunc={() => console.log(company.getAncestors(team))} buttonText={'Choose Team'}/> }
        </div>
      </div>
    )
  }
}

export default Card;