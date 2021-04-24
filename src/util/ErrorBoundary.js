import React from 'react';
import FullScreenLayout from '../layouts/FullScreenLayout';
import Error from '../pages/Error';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
          // TODO : add client level logging so we know about client exceptions
        return (
        <FullScreenLayout>
            <Error />
        </FullScreenLayout>);
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;
