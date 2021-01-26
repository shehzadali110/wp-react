import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import clientConfig from '../../../../client-config';
import {PostsAvailable, PostsNotAvailable} from "./Post";

function Pagination() {
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(3);
    const [pageCount, setPageCount] = useState(0)

    const getData = async () => {
        const wordPressSiteURL = clientConfig.appUrl + clientConfig.getImgPosts;
        const res = await axios.get(`${wordPressSiteURL}`)
        const data = res.data;
        const slice = data.slice(offset, offset + perPage)

        const postData = slice ? slice.map((post, index) => 
            <PostsAvailable 
                key={post.id}
                index={index}
                id={post.id}
                date={post.date}
                title={post.title.rendered} 
                media={post.featured_media}
                img={post._embedded['wp:featuredmedia'][0].media_details.sizes["medium"].source_url}
                description={post.excerpt.rendered}
            />
        ) : <PostsNotAvailable/>

        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    useEffect(() => {
        getData()
    }, [offset])

    return (
        <React.Fragment>
            <div className="container">
                {data}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        </React.Fragment>
    );
}

export default Pagination;
