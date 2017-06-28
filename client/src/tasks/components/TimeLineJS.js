/**
 * Created by Xingyu on 6/28/2017.
 */
let timeline = {};
let vis_timeline;
let items_dataset;
let groups_dataset;

timeline.create = function(container, items, groups, options){
    items_dataset = new vis.DataSet(items);
    groups_dataset = new vis.DataSet(groups);
    vis_timeline = new vis.Timeline(container,items_dataset, groups_dataset, options);
};

timeline.fit = function([options]){
    vis_timeline.fit([options]);
};

timeline.setItems = function(items){
    items_dataset.update(items);
    vis_timeline.setItems(items);
};

timeline.setGroups = function(groups){
    groups_dataset.update(groups);
    vis_timeline.setGroups(groups);
};

timeline.setData = function(data){
    groups_dataset.update(data.groups);
    items_dataset.update(data.items);
    vis_timeline.setData({groups: data.groups, items: data.items});
    vis_timeline.fit();
};
timeline.destroy = function(){
    //vis_timeline.destroy();
};

export default timeline;