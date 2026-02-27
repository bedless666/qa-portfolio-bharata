# 📊 JIRA Kanban Daily Task Management

> **Type:** Daily Task Management Tool  
> **Created:** 2023  
> **Technology:** JIRA Kanban Board + Manual Process  
> **Team:** Regression QA Team

---

## 📋 Overview

This tool represents the **daily task management system** used by the Regression QA Team at Shopee. It's built on JIRA Kanban methodology to track, prioritize, and manage daily testing activities, bug verification, and regression cycles.

Unlike the other tools in this collection (which are automated scripts), this is a **process and methodology** implemented through JIRA's Kanban board system.

---

## 🎯 Purpose

**Primary Goals:**
- Track daily QA tasks and bug verification activities
- Manage regression testing cycles and priorities
- Provide visibility into team workload and progress
- Enable efficient task handoff and collaboration
- Monitor testing bottlenecks and blockers

**Target Users:**
- QA Engineers (Regression Team)
- QA Team Lead
- Development Teams (for bug status visibility)
- Product Managers (for testing progress tracking)

---

## 🔄 Daily Workflow

### Morning Routine (9:00 AM - 10:00 AM)
1. **Review Backlog**
   - Check new bugs assigned from overnight
   - Review regression test cases scheduled for the day
   - Identify high-priority items from Product/Dev teams

2. **Task Prioritization**
   - Move urgent bugs to "In Progress"
   - Assign regression test suites to team members
   - Flag blockers or dependencies

3. **Daily Standup**
   - Update task status in JIRA
   - Communicate blockers to team
   - Adjust priorities based on team discussion

### During the Day (10:00 AM - 6:00 PM)
4. **Active Testing**
   - Move tasks through workflow: To Do → In Progress → Testing → Done
   - Update task comments with findings
   - Create bug tickets for new issues found
   - Link related tickets (bugs ↔ test cases)

5. **Continuous Updates**
   - Update task estimates and time spent
   - Add labels for categorization (e.g., `critical`, `regression`, `smoke`)
   - Attach evidence (screenshots, logs, videos)

### End of Day (5:00 PM - 6:00 PM)
6. **Wrap-up**
   - Ensure all tasks have current status
   - Move completed tasks to "Done"
   - Add handoff notes for next day or team members
   - Review WIP (Work In Progress) limit

---

## 📊 Kanban Board Structure

### Columns
1. **Backlog** - All incoming tasks
2. **To Do** - Prioritized tasks for current sprint/week
3. **In Progress** - Currently being worked on (WIP limit: 3 per person)
4. **Testing** - Verification in progress
5. **Blocked** - Tasks waiting on dependencies
6. **Done** - Completed tasks

### Card Types
- 🐛 **Bug Verification** - Verify reported bugs
- ✅ **Test Execution** - Execute regression/smoke test suites
- 📝 **Test Case Review** - Review and update test cases
- 🔄 **Retest** - Re-verify fixed bugs
- 🚀 **Release Testing** - Pre-release validation

### Labels & Tags
- `P0-Critical` - Production blockers
- `P1-High` - High priority
- `P2-Medium` - Medium priority
- `P3-Low` - Low priority
- `regression` - Regression test tasks
- `smoke` - Smoke test tasks
- `api` - API testing
- `mobile` - Mobile app testing
- `web` - Web testing

---

## 🎯 Key Metrics Tracked

1. **Velocity**
   - Tasks completed per day/week
   - Average time per task type

2. **Quality Metrics**
   - Bugs found during regression
   - Retest pass/fail rate
   - Test case coverage

3. **Team Health**
   - WIP limit adherence
   - Blocker frequency and resolution time
   - Task distribution across team

---

## 💡 Best Practices

### Task Management
- ✅ Keep task descriptions clear and actionable
- ✅ Update status in real-time (not end of day)
- ✅ Add comments for important findings
- ✅ Link related tickets (bugs, test cases, stories)
- ✅ Respect WIP limits (max 3 in progress per person)

### Communication
- ✅ Use @mentions for urgent items
- ✅ Add screenshots/videos for visual bugs
- ✅ Document reproduction steps in comments
- ✅ Flag blockers immediately with clear description

### Handoff
- ✅ Add handoff notes when leaving tasks incomplete
- ✅ Tag the person taking over
- ✅ Document current state and next steps

---

## 📈 Impact

**Team Efficiency:**
- Reduced task handoff time by 40%
- Improved visibility into testing progress
- Enabled better workload distribution

**Quality Improvements:**
- Faster bug turnaround time
- Better tracking of regression coverage
- Reduced missed test cases

**Collaboration:**
- Clear communication channel with Dev teams
- Transparent progress for stakeholders
- Efficient daily standups

---

## 🔗 Integration with Other Tools

This Kanban system integrates with other tools in this collection:

1. **JIRA Weekly Summary** (`02-jira-weekly-summary/`)
   - Pulls data from this Kanban board
   - Generates weekly reports automatically

2. **Monthly Regression Schedule** (`04-monthly-regression-schedule/`)
   - Creates tasks in this board for scheduled regression cycles
   - Links to regression test suites

3. **Bug Creation Tool** (`01-bug-creation-tool/`)
   - Creates bug tickets that appear in this board
   - Links bugs to test cases

---

## 📚 Related Documentation

- [JIRA Kanban Guide](https://www.atlassian.com/agile/kanban)
- [Shopee QA Process Documentation](https://confluence.shopee.io/qa)
- [Regression Testing Strategy](../02-regression-automation/)

---

## 🎓 Skills Demonstrated

- **Agile/Kanban Methodology**
- **Task Prioritization & Time Management**
- **Team Collaboration & Communication**
- **Process Optimization**
- **Metrics & Reporting**
- **JIRA Administration**

---

## 📝 Notes

- This is a **process/methodology**, not an automated script
- Requires discipline and team buy-in for effectiveness
- Continuously refined based on team feedback
- Adapted from standard Kanban practices for QA-specific needs

---

**Created by:** Bharata Aryaseta  
**Team:** Regression QA - Marketplace Platform  
**Company:** Shopee Indonesia
