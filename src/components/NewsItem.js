import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, nurl, author, publishedAt, source } =
      this.props;
    let datee = new Date(publishedAt);

    return (
      <div className="my-4">
        <div className="card" style={{ width: "18rem" }}>
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-success"
            style={{ left: "91%", zIndex: "1" }}
          >
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} at {datee.toGMTString().slice(0, 12)}
              </small>
            </p>

            <a
              href={nurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
