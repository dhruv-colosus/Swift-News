import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./News.css";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 20,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    console.log("Working");

    this.state = {
      //setting up default states for our class
      loading: false,
      articles: [],
      defaultimageURL:
        "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA=",
      page: 1,
    };

    document.title =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1) +
      " | Swift News"; //Capitalizing Function
  }

  async componentDidMount() {
    this.setState({ loading: true });

    //THis will occur after our page is rendered
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4deb01ae72484605a3c949ea0c4326b4&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let finaldata = await data.json(); //Fetching data as json from our api
    console.log(finaldata);
    this.setState({
      loading: false,
      articles: finaldata.articles,
      totalResults: finaldata.totalResults,
    });
  }
  handlePrev = async () => {
    // Previous button function. Doing the same thing as above just changing the page number
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=4deb01ae72484605a3c949ea0c4326b4&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true, articles: [] });

    let data = await fetch(url);
    let finaldata = await data.json();
    this.setState({
      loading: false,

      page: this.state.page - 1,
      articles: finaldata.articles,
    });
  };
  handleNext = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      //since 20 articles are there in one page due to pagesize

      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=4deb01ae72484605a3c949ea0c4326b4&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true, articles: [] });
      let data = await fetch(url);
      let finaldata = await data.json();

      this.setState({
        //Setting the state of page and getting new articles as api url is changing
        loading: false,
        page: this.state.page + 1,
        articles: finaldata.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop: "90px" }}>
          {" "}
          Headlines of the day |
          {" " +
            this.props.category.charAt(0).toUpperCase() +
            this.props.category.slice(1)}
        </h1>
        {this.state.loading && <Spinner />}
        {/* /*if loading is true then show
        spinner */}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : this.state.defaultimageURL
                  }
                  nurl={element.url}
                  author={element.author ? element.author : "Unknown"}
                  publishedAt={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-evenly ">
          <button
            type="button"
            className="btn btn-dark mybutton"
            onClick={this.handlePrev}
            disabled={this.state.page <= 1}
          >
            &larr;Prev
          </button>
          <button
            type="button"
            className="btn btn-dark mybutton "
            onClick={this.handleNext}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
