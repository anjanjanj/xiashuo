MainLayout = React.createClass({
  render() {
    return (
      <header>
        <h1>Xiashuo</h1>
      </header>
      <main>{this.props.content}</main>
    );
  }
});
