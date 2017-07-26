import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardList from '@/components/ui/Cards/CardList';
import { fetchGenres } from '@/modules/sections/genres';

class GenresContainer extends Component {

  componentDidMount() {
    this.props.fetchGenres();
  }

  render() {
    const { loading, genres } = this.props;
    console.log('this.props', this.props);

    return (
      <div>
        {(!loading) && (
          <CardList items={genres} />
        )}
        {/*{(loading) && (<Spinner />)}*/}
      </div>
    );
  }

}

// PropTypes validation
GenresContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGenres: PropTypes.func.isRequired,
};

GenresContainer.defaultProps = {
  genres: [],
};

// Redux connector
const mapStateToProps = state => ({
  genres: state.sections.genres.list,
  loading: state.sections.genres.loading,
});

const mapDispatchToProps = {
  fetchGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresContainer);
